# 🐍 RTSP Overlay Application - Backend

This is the backend server for the RTSP Livestream Overlay Application. It is built using **Python Flask** and follows the **MVC (Model-View-Controller)** architecture pattern.

It handles two main responsibilities:
1.  **Video Processing:** Consumes an RTSP stream (or Webcam), processes frames using OpenCV, and streams them to the frontend via MJPEG.
2.  **Data Persistence:** Provides RESTful CRUD APIs to manage Overlay data stored in **MongoDB**.

## 🛠️ Tech Stack

* **Framework:** Flask
* **Database Driver:** PyMongo
* **Video Processing:** OpenCV (`cv2`)
* **Environment Management:** Python-Dotenv
* **CORS:** Flask-CORS (To allow frontend communication)

---

## 📂 Project Structure (MVC)

The backend is organized to ensure separation of concerns:

```text
backend/
├── app/
│   ├── config/          # Database connection logic (db.py)
│   ├── controllers/     # Handles incoming requests & returns responses
│   ├── models/          # Defines data structure/schema for Overlays
│   ├── routes/          # Defines API URL endpoints (Blueprints)
│   └── services/        # Business logic (Video streaming, DB operations)
├── venv/                # Virtual Environment
├── .env                 # Environment variables (Ignored by Git)
├── requirements.txt     # List of dependencies
└── run.py               # Application Entry Point

🚀 Setup & Installation
1. Prerequisites
Python 3.8 or higher installed.

MongoDB Atlas connection string.

2. Installation Steps
Navigate to the backend directory:

Bash

cd backend
Create a virtual environment:

Bash

# On macOS/Linux
python3 -m venv venv

# On Windows
python -m venv venv
Activate the virtual environment:

Bash

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
Install dependencies:

Bash

pip install -r requirements.txt
3. Configuration (.env)
Create a .env file in the root of the backend folder and add the following:

Code snippet

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rtsp_project?retryWrites=true&w=majority
SECRET_KEY=your_secret_key_here
PORT=5000
4. Running the Server
Start the Flask application:

Bash

python run.py
The server will start on http://127.0.0.1:5000


Bhai, ye rahi Backend specific README. Isko backend/README.md naam se save kar le.

Isme maine MVC Architecture ko highlight kiya hai aur API Endpoints ki details di hain, jo technical submission ke liye bahut impressive lagta hai.

📄 File: backend/README.md
Markdown

# 🐍 RTSP Overlay Application - Backend

This is the backend server for the RTSP Livestream Overlay Application. It is built using **Python Flask** and follows the **MVC (Model-View-Controller)** architecture pattern.

It handles two main responsibilities:
1.  **Video Processing:** Consumes an RTSP stream (or Webcam), processes frames using OpenCV, and streams them to the frontend via MJPEG.
2.  **Data Persistence:** Provides RESTful CRUD APIs to manage Overlay data stored in **MongoDB**.

## 🛠️ Tech Stack

* **Framework:** Flask
* **Database Driver:** PyMongo
* **Video Processing:** OpenCV (`cv2`)
* **Environment Management:** Python-Dotenv
* **CORS:** Flask-CORS (To allow frontend communication)

---

## 📂 Project Structure (MVC)

The backend is organized to ensure separation of concerns:

```text
backend/
├── app/
│   ├── config/          # Database connection logic (db.py)
│   ├── controllers/     # Handles incoming requests & returns responses
│   ├── models/          # Defines data structure/schema for Overlays
│   ├── routes/          # Defines API URL endpoints (Blueprints)
│   └── services/        # Business logic (Video streaming, DB operations)
├── venv/                # Virtual Environment
├── .env                 # Environment variables (Ignored by Git)
├── requirements.txt     # List of dependencies
└── run.py               # Application Entry Point
🚀 Setup & Installation
1. Prerequisites
Python 3.8 or higher installed.

MongoDB Atlas connection string.

2. Installation Steps
Navigate to the backend directory:

Bash

cd backend
Create a virtual environment:

Bash

# On macOS/Linux
python3 -m venv venv

# On Windows
python -m venv venv
Activate the virtual environment:

Bash

# On macOS/Linux
source venv/bin/activate

# On Windows
venv\Scripts\activate
Install dependencies:

Bash

pip install -r requirements.txt
3. Configuration (.env)
Create a .env file in the root of the backend folder and add the following:

Code snippet

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rtsp_project?retryWrites=true&w=majority
SECRET_KEY=your_secret_key_here
PORT=5000
4. Running the Server
Start the Flask application:

Bash

python run.py
The server will start on http://127.0.0.1:5000.

📡 API Documentation
Method,                Endpoint,                 Description
GET,                   /video_feed,              Returns a multipart MJPEG stream of the video.

Note on RTSP Source: To change the video source, edit app/services/video_service.py.

Set rtsp_url = 0 for Webcam.

Set rtsp_url = "rtsp://..." for an RTSP link.


📝 Overlay Management(CRUD)
Method,                 Endpoint,                    Description,                    Request Body (JSON)
GET,                    /overlays,                   Fetch all overlays.,            N/A
POST,                   /overlays,                   Create a new overlay.,          "{ ""content"": ""Hello"", ""type"": ""text"" }"
PUT,                    /overlays/<id>,              Update position/size.,          "{ ""x"": 100, ""y"": 50, ""width"": 200, ""height"": 100 }"
DELETE,                 /overlays/<id>,              Delete an overlay.,             N/A

🐛 Common Issues
ModuleNotFoundError: Ensure you have activated the virtual environment (source venv/bin/activate) before running python run.py.

Video not playing: Check if the RTSP link in video_service.py is active. Public RTSP links often expire.

Database Connection Failed: Ensure your IP address is whitelisted in MongoDB Atlas Network Access.

