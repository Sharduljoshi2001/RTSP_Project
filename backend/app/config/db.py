from pymongo import MongoClient
import os
from dotenv import load_dotenv
#loading env file
load_dotenv()
#grabbing uri from environment variable
mongo_uri = os.getenv("MONGO_URI")
#creating client
try:
    client = MongoClient(mongo_uri)
    db = client["rtsp_project"] 
#selecting the db   
except Exception as e:
    print(f"Error connecting to Mongo Client: {e}")
#function to check if db is connected or not
def verify_db_connection():
    try:
        client.admin.command('ping')
        print("successfully connected to db!")
    except Exception as e:
        print(f"connection failed: {e}")