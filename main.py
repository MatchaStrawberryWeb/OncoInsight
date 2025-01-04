from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
import os
import joblib  # Use for loading .pkl models
from PIL import Image
import numpy as np
import io
import logging

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create FastAPI app instance
app = FastAPI()

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
