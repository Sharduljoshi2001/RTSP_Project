# backend/run.py
from flask import Flask
from app.config.db import verify_db_connection
import os
from dotenv import load_dotenv
#loading the env variables
load_dotenv()
app = Flask(__name__)
@app.route('/')
def home():
    return "RTSP overlay servr is running"
if __name__ == "__main__":
    #checking connnection before starting the server
    print("connecting to database...")
    verify_db_connection()
    port = int(os.getenv("PORT", 5000))
    app.run(debug=True, port=port)