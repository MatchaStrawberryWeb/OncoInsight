# backend/routes/login.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

router = APIRouter()

# Example user data for authentication (replace with real database in production)
users_db = {
    "user": {"username": "user", "password": "password"}  # Simple example, use a real database in production
}

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(data: LoginData):
    # Simulate checking user credentials
    user = users_db.get(data.username)
    if user and user["password"] == data.password:
        return {"message": "Login successful", "redirect": "/dashboard"}
    raise HTTPException(status_code=401, detail="Invalid credentials")
