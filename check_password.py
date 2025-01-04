from passlib.context import CryptContext

# Create a CryptContext instance to handle password hashing
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Your example password and hashed password from the database
password = "admin"  # Plain text password you want to verify
hashed_password = "$2a$10$uS7ZdW0QskE9xhVnnSdy1OBbQF.vZkLVAGD5kLgH0eH9xXkIE5TtC"  # The hashed password

# Verify the password against the hash
if pwd_context.verify(password, hashed_password):
    print("Password matches!")
else:
    print("Invalid password")
