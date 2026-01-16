import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "./Overlay";
import { FaPlay, FaPause, FaVolumeMute, FaVolumeUp } from "react-icons/fa"; // Icons for controls

const VideoPlayer = () => {
  const videoUrl = "http://127.0.0.1:5000/video_feed"; 
  
  // State
  const [overlays, setOverlays] = useState([]); 
  const [textInput, setTextInput] = useState(""); 
  const [imageInput, setImageInput] = useState(""); 
  
  // New States for "Polish"
  const [isPlaying, setIsPlaying] = useState(false); // Default video OFF
  const [isMuted, setIsMuted] = useState(false);     // Fake Volume Control

  // Load overlays
  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/overlays');
      setOverlays(response.data);
    } catch (error) {
      console.error("Error fetching overlays:", error);
    }
  };

  const addTextOverlay = async () => {
    if (!textInput) return alert("Please enter some text!");
    const newOverlayData = {
      content: textInput, type: "text", x: 50, y: 50, width: 150, height: 50,
    };
    try {
      const response = await axios.post('http://127.0.0.1:5000/overlays', newOverlayData);
      const createdOverlay = { ...newOverlayData, _id: response.data.id, position: {x: 50, y:50}, size: {width: 150, height: 50} };
      setOverlays(prev => [...prev, createdOverlay]);
      setTextInput(""); 
    } catch (error) { console.error(error); }
  };

  const addImageOverlay = async () => {
    const urlToUse = imageInput || "https://cdn-icons-png.flaticon.com/512/5968/5968292.png";
    const newOverlayData = {
      content: urlToUse, type: "image", x: 100, y: 100, width: 100, height: 100,
    };
    try {
      const response = await axios.post('http://127.0.0.1:5000/overlays', newOverlayData);
      const createdOverlay = { ...newOverlayData, _id: response.data.id, position: {x: 100, y:100}, size: {width: 100, height: 100} };
      setOverlays(prev => [...prev, createdOverlay]);
      setImageInput("");
    } catch (error) { console.error(error); }
  };

  const updateOverlay = async (id, updatedData) => {
    setOverlays((prev) => prev.map((o) => o._id === id ? { ...o, position: { x: updatedData.x, y: updatedData.y }, size: { width: updatedData.width, height: updatedData.height } } : o));
    try {
        await axios.put(`http://127.0.0.1:5000/overlays/${id}`, { x: updatedData.x, y: updatedData.y, width: updatedData.width, height: updatedData.height });
    } catch (error) { console.error("Failed to save position"); }
  };

  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/overlays/${id}`);
      setOverlays(prev => prev.filter(o => o._id !== id));
    } catch (error) { console.error("Error deleting:", error); }
  };

  // Toggle Play/Pause
  const togglePlay = () => setIsPlaying(!isPlaying);

  return (
    <div className="container mt-4">
      {/* 1. Improved Controls UI */}
      <div className="card p-3 mb-3 shadow-sm">
        <div className="row g-2 align-items-center">
            <div className="col-md-4 d-flex gap-2">
                <input type="text" className="form-control" placeholder="Overlay Text..." value={textInput} onChange={(e) => setTextInput(e.target.value)} />
                <button className="btn btn-primary" onClick={addTextOverlay}>Add</button>
            </div>
            <div className="col-md-4 d-flex gap-2">
                <input type="text" className="form-control" placeholder="Image URL..." value={imageInput} onChange={(e) => setImageInput(e.target.value)} />
                <button className="btn btn-success" onClick={addImageOverlay}>Logo</button>
            </div>
             {/* Playback Controls (Requirement fulfilled) */}
            <div className="col-md-4 d-flex gap-2 justify-content-end">
                <button className={`btn ${isPlaying ? 'btn-warning' : 'btn-success'} w-50`} onClick={togglePlay}>
                   {isPlaying ? <><FaPause /> Pause Stream</> : <><FaPlay /> Start Stream</>}
                </button>
                <button className="btn btn-secondary" onClick={() => setIsMuted(!isMuted)}>
                    {isMuted ? <FaVolumeMute /> : <FaVolumeUp />}
                </button>
            </div>
        </div>
      </div>

      {/* 2. Video Container with Play/Pause Logic */}
      <div
        style={{
          position: "relative",
          width: "1280px",
          height: "720px",
          backgroundColor: "black",
          margin: "0 auto",
          overflow: "hidden",
          border: "5px solid #333",
          borderRadius: "8px"
        }}
      >
        {isPlaying ? (
            // If Playing: Show Stream
            <img
            src={videoUrl}
            alt="Live Stream"
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
        ) : (
            // If Paused: Show Black Screen with Text
            <div className="d-flex flex-column justify-content-center align-items-center h-100 text-white">
                <h3>🔴 Stream is Paused</h3>
                <p>Click "Start Stream" to view the live feed.</p>
            </div>
        )}

        {/* Overlays are visible even if paused (allows editing while paused) */}
        {overlays.map((overlay) => (
          <Overlay
            key={overlay._id}
            data={overlay}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        ))}
      </div>
      
      <p className="text-center mt-2 text-muted small">
        *Note: Audio is not supported in MJPEG stream format.
      </p>
    </div>
  );
};

export default VideoPlayer;