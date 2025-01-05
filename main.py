from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import joblib  # Use for loading .pkl models
from PIL import Image
import numpy as np
import io
import logging
import mysql.connector
import bcrypt
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app instance
app = FastAPI()

# Enable CORS for all origins (or restrict to your frontend URL)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with your frontend URL to restrict
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic model to validate the incoming request data
class LoginRequest(BaseModel):
    username: str
    password: str

# Function to check login credentials
def check_login(username: str, password: str):
    # Connect to the MySQL database
    conn = mysql.connector.connect(
        host='localhost',
        user='root',
        password='',  # Add your MySQL password here
        database='oncoinsight'
    )
    cursor = conn.cursor()

    # Retrieve the hashed password for the username from the database
    cursor.execute("SELECT password FROM users WHERE username = %s", (username,))
    result = cursor.fetchone()

    # Close the connection
    conn.close()

    if result:
        stored_hash = result[0]
        if bcrypt.checkpw(password.encode('utf-8'), stored_hash.encode('utf-8')):
            return True
    return False

# FastAPI route to handle login
@app.post("/login")
async def login(request: LoginRequest):
    if check_login(request.username, request.password):
        return {"message": "Login successful!"}
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")

# Resolve model directory
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_DIR = os.path.join(BASE_DIR, "models")

# Function to load model dynamically based on the cancer type
def load_model(cancer_type: str):
    model_path = os.path.join(MODEL_DIR, f"{cancer_type}_model.pkl")
    
    if not os.path.exists(model_path):
        raise FileNotFoundError(f"Model for {cancer_type} not found at {model_path}")
    
    # Load and return the model using joblib
    return joblib.load(model_path)

# API endpoint for cancer diagnosis based on uploaded file
@app.post("/api/diagnosis/{cancer_type}")
async def diagnosis(cancer_type: str, file: UploadFile = File(...)):
    """
    Endpoint to handle file upload and return cancer diagnosis for the given cancer type.
    """
    try:
        logger.info(f"Diagnosis request for cancer type: {cancer_type}")
        
        # Check if the cancer type is valid
        valid_cancer_types = ["breast", "lung", "prostate", "colon", "skin"]
        if cancer_type not in valid_cancer_types:
            raise HTTPException(status_code=400, detail="Invalid cancer type specified")

        # Load the appropriate model for the specified cancer type
        model = load_model(cancer_type)
        
        # Read the uploaded file (assuming it's an image)
        file_contents = await file.read()
        image = Image.open(io.BytesIO(file_contents))
        image = image.resize((224, 224))  # Resize image to match model input size
        image = np.array(image) / 255.0  # Normalize the image
        image = np.expand_dims(image, axis=0)  # Add batch dimension

        # Predict using the loaded model
        prediction = model.predict(image)

        # Assume binary classification (0 = Negative, 1 = Positive)
        result = "Cancer Diagnosis Result: Positive" if prediction[0][0] > 0.5 else "Cancer Diagnosis Result: Negative"

        return JSONResponse(content={"result": result}, status_code=200)

    except FileNotFoundError as e:
        logger.error(f"FileNotFoundError: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=404)
    except Exception as e:
        logger.error(f"Error: {e}")
        return JSONResponse(content={"error": str(e)}, status_code=500)

# Optional root endpoint for testing
@app.get("/")
def read_root():
    return {"message": "Welcome to the OncoInsight API!"}
