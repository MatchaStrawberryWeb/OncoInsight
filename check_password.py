import bcrypt

hashed_password = b"$2b$12$fDcXD7EHz600AiOnOKpEm.UAHqVW6TpdfA96YhAJqI7RwV76qO106" 
plaintext_password = "doctor02"

if bcrypt.checkpw(plaintext_password.encode('utf-8'), hashed_password):
    print("Password matches!")
else:
    print("Password does not match.")
