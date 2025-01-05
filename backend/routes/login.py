import mysql.connector
import bcrypt

# Connect to your MySQL database
conn = mysql.connector.connect(
    host='localhost',           
    user='root',      
    password='',
    database='oncoinsight'  
)

cursor = conn.cursor()

# Retrieve the hashed password for the 'admin' user
cursor.execute("SELECT password FROM users WHERE username = %s", ('admin',))
stored_hash = cursor.fetchone()[0]  # This returns the hashed password from the database

# Close the connection
conn.close()

# Input the plaintext password for login
plaintext_password = "admin"  # Example input password

# Check if the entered password matches the stored hash
if bcrypt.checkpw(plaintext_password.encode('utf-8'), stored_hash.encode('utf-8')):
    print("Login successful!")
else:
    print("Login failed. Incorrect password.")
