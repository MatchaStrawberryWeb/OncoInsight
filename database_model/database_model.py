# database_model/database_model.py
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from database_model.user import User
from dependencies.database import Base, engine

def init_db():
    Base.metadata.create_all(bind=engine)

SQLALCHEMY_DATABASE_URL = "sqlite:///./test.db"  # Example for SQLite, change it as needed

engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False})

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

# Dependency to get the database session
def get_db():
    db = SessionLocal()  # Create a new database session
    try:
        yield db  # Return the session to be used in routes
    finally:
        db.close()  # Close the session after use
