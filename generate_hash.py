import bcrypt

# Generate a hash for user
plaintext_password = "nurse02"
hashed_password = bcrypt.hashpw(plaintext_password.encode('utf-8'), bcrypt.gensalt())
print(f"Generated hash: {hashed_password.decode('utf-8')}")
