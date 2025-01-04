# backend/routes/login.py
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import bcrypt

router = APIRouter()

# Example user data for authentication (replace with real database in production)
users_db = {
    "admin": {"username": "admin", "password": "$2a$10$uS7ZdW0QskE9xhVnnSdy1OBbQF.vZkLVAGD5kLgH0eH9xXkIE5TtC"}  # Admin with hashed password
}

class LoginData(BaseModel):
    username: str
    password: str

@router.post("/login")
async def login(data: LoginData):
    print(f"Attempting login for: {data.username}")  # Debug log
    user = users_db.get(data.username)
    if user:
        print(f"User found: {user}")  # Debug log
        # Check hashed password
        if bcrypt.checkpw(data.password.encode('utf-8'), user["password"].encode('utf-8')):
            return {"message": "Login successful", "redirect": "/dashboard"}
        else:
            raise HTTPException(status_code=401, detail="Invalid credentials")
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")
