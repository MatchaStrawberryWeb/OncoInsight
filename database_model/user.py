from sqlalchemy import Column, Integer, String
from dependencies.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)  # Username field
    password = Column(String(200))  # Hashed password field
    created_at = Column(String(100))  # Timestamp when the user was created

