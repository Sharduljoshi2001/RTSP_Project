# ⚛️ RTSP Overlay Application - Frontend

This is the client-side application for the RTSP Livestream Overlay project. It is built using **React** (via **Vite**) for high performance and uses **Bootstrap** for styling.

It connects to the Flask backend to display the live video stream and provides an interactive interface for managing overlays.

## 🛠️ Tech Stack & Libraries

* **Build Tool:** [Vite](https://vitejs.dev/) (Chosen for faster build times compared to CRA)
* **Framework:** React.js
* **Styling:** Bootstrap 5 & React-Bootstrap
* **API Handling:** Axios
* **Interactivity:**
    * `react-rnd`: Used for **Drag-and-Drop** and **Resizing** functionality without complex calculations.
    * `react-icons`: For UI icons (Play, Pause, Delete).

---

## 🚀 Setup & Installation

### 1. Prerequisites
* Node.js (v14 or higher) installed.
* npm (Node Package Manager).

### 2. Installation Steps

Navigate to the frontend directory:
```bash
cd frontend
Install the dependencies:

Bash

npm install
3. Running the Application
Start the development server:

Bash

npm run dev
The terminal will show a local URL (usually http://localhost:5173). Open this link in your browser.

📂 Project Structure
Plaintext

frontend/
├── public/
├── src/
│   ├── components/
│   │   ├── Overlay.jsx       # Renders individual draggable/resizable stickers
│   │   └── VideoPlayer.jsx   # Main component: Handles Video, API calls, and State
│   ├── App.jsx               # Main Layout
│   ├── main.jsx              # Entry Point
│   └── index.css             # Global Styles
├── index.html
├── package.json
└── vite.config.js
💡 Key Features & Implementation Details
1. MJPEG Video Streaming
The application renders the livestream simply using an <img> tag pointing to the backend stream URL. This is because the backend converts the RTSP feed into a Motion JPEG stream, which browsers can render natively without heavy video players.

2. Drag & Drop Architecture (react-rnd)
We use react-rnd to wrap every overlay.

OnDragStop: Captures the final (x, y) coordinates.

OnResizeStop: Captures the new width and height. These values are then sent to the backend to persist the state.

3. Optimistic UI Updates
To ensure a smooth user experience (UX), the application uses Optimistic Updates:

When a user moves an overlay, the local React state updates immediately.

The API call to save the position happens asynchronously in the background.

This prevents the "snap-back" glitch and makes the interface feel instant, regardless of network latency.

⚙️ Configuration
The Backend URL is currently set to http://localhost:5000.

To change the API endpoint (e.g., for deployment), open src/components/VideoPlayer.jsx and update the videoUrl and Axios request URLs.

JavaScript

// src/components/VideoPlayer.jsx
const videoUrl = "http://YOUR_BACKEND_IP:5000/video_feed";
🐛 Common Issues
"Container is not defined":

Make sure you have imported Bootstrap components correctly in App.jsx.

White Screen on Load:

Check the browser console (F12). If you see a connection error, ensure the Backend Server is running.

Overlays not saving:

Ensure the backend is running and connected to MongoDB. Check the Network tab in browser developer tools for API errors.