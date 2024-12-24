from fastapi import FastAPI
import joblib
from pydantic import BaseModel

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}

# Load the model
model = joblib.load('models/breast_cancer_model.pkl')

class PatientData(BaseModel):
    Clump_Thickness: float
    Uniformity_of_Cell_Size: float
    Uniformity_of_Cell_Shape: float
    Marginal_Adhesion: float
    Single_Epithelial_Cell_Size: float
    Bare_Nuclei: float
    Bland_Chromatin: float
    Normal_Nucleoli: float
    Mitoses: float

@app.post("/predict")
def predict(data: PatientData):
    input_data = [[
        data.Clump_Thickness,
        data.Uniformity_of_Cell_Size,
        data.Uniformity_of_Cell_Shape,
        data.Marginal_Adhesion,
        data.Single_Epithelial_Cell_Size,
        data.Bare_Nuclei,
        data.Bland_Chromatin,
        data.Normal_Nucleoli,
        data.Mitoses
    ]]

    prediction = model.predict(input_data)
    return {"prediction": int(prediction[0])}
