import bcrypt

hashed_password = b"$2b$12$Ecq7RiqluhIpBsK/z8NJFumrNNGWY3Q7G2RRSFXsoAnx7LuYdErBO" 
plaintext_password = "admin"

if bcrypt.checkpw(plaintext_password.encode('utf-8'), hashed_password):
    print("Password matches!")
else:
    print("Password does not match.")
