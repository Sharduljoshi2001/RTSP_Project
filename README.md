File: README.md (Copy Paste This)
Markdown

# 📹 RTSP Livestream Overlay Application

A full-stack web application that plays a livestream video from an RTSP source and allows users to create, manage, and display custom overlays (Text & Images) on top of the video in real-time.

**Assignment Submission for:** GoNote.ai

## 🚀 Features

* **Live Video Streaming:** Converts RTSP video feed to MJPEG for browser playback using OpenCV & Flask.
* **Interactive Overlays:** Add Text or Image overlays on top of the video.
* **Drag & Drop:** Freely move and resize overlays using the mouse.
* **Data Persistence:** Overlays (Position, Size, Content) are saved in MongoDB and persist after page refresh.
* **Playback Controls:** Play, Pause, and Volume UI indicators.
* **Optimistic UI:** Instant visual updates while syncing data with the backend.

## 🛠️ Tech Stack

* **Frontend:** React.js (Vite), Bootstrap, Axios, React-Rnd
* **Backend:** Python (Flask), OpenCV (cv2)
* **Database:** MongoDB Atlas (Cloud)
* **Architecture:** MVC (Model-View-Controller)

---

## ⚙️ Prerequisites

Before you begin, ensure you have the following installed:
* **Python** (v3.8 or higher)
* **Node.js** (v14 or higher) & **npm**
* **MongoDB Atlas URI** (Connection string)

---

## 🏃‍♂️ Quick Start Guide

Follow these steps to run the application locally.

### 1. Backend Setup (Terminal 1)

Navigate to the backend folder and set up the Python environment.

```bash
cd backend

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
# On Mac/Linux:
source venv/bin/activate
# On Windows:
# venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
Configuration: Create a .env file inside the backend folder and add your MongoDB credentials:

Code snippet

MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/rtsp_project?retryWrites=true&w=majority
SECRET_KEY=mysecretkey
PORT=5000
Run Server:

Bash

python run.py
You should see: Running on http://127.0.0.1:5000

2. Frontend Setup (Terminal 2)
Open a new terminal window, navigate to the frontend folder.

Bash

cd frontend

# Install Node modules
npm install

# Run the React App
npm run dev
Click the link provided (usually http://localhost:5173) to open the app.

🎥 How to Change RTSP URL
To change the source video stream:

Open backend/app/services/video_service.py.

Locate the generate_frames function.

Change the rtsp_url variable:

For Webcam: Use 0 (Zero).

For RTSP Stream: Paste your RTSP link (e.g., rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4).


📡 API Reference (CRUD)
Method,                Endpoint,                       Description
GET,                   /video_feed,                    Streams the converted MJPEG video.
GET,                   /overlays,                      Fetches all saved overlays.
POST,                  /overlays,                      Creates a new overlay (Text or Image).
PUT,                   /overlays/<id>,                 "Updates position (x, y) and size (w, h)."
DELETE,                /overlays/<id>,                 Deletes an overlay.


📂 Project Structure
project-2/
├── backend/                 # Python Flask Server
│   ├── app/
│   │   ├── config/          # DB Connection
│   │   ├── controllers/     # API Logic
│   │   ├── models/          # Data Structure
│   │   ├── routes/          # API Endpoints
│   │   └── services/        # Business Logic (Video Processing)
│   ├── run.py               # Entry Point
│   └── requirements.txt     # Python Dependencies
│
└── frontend/                # React Vite App
    ├── src/
    │   ├── components/      # VideoPlayer & Overlay Components
    │   ├── App.jsx          # Main Layout
    │   └── main.jsx         # DOM Entry
    └── package.json         # Node Dependencies
🐛 Troubleshooting
Video not showing?

Ensure the Flask backend is running on Port 5000.

Check if the RTSP link is active (or switch to Webcam '0' for testing).

"Container not defined"?

Ensure you have installed dependencies inside the frontend folder (npm install).

Database Error?

Check if your IP is whitelisted in MongoDB Atlas Network Access (0.0.0.0/0).

📹 Demo Video Link


Developed by: Shardul Joshi, 7668768128