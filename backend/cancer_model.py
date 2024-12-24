import joblib

def load_model(model_name: str):
    """Loads the specified cancer model."""
    model_path = f'backend/models/{model_name}_model.pkl'
    try:
        model = joblib.load(model_path)
        return model
    except FileNotFoundError:
        raise FileNotFoundError(f"Model {model_name} not found.")
