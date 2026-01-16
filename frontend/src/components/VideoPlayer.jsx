import React, { useState, useEffect } from "react";
import axios from "axios";
import Overlay from "./Overlay";

const VideoPlayer = () => {
  const videoUrl = "http://127.0.0.1:5000/video_feed"; // Backend stream url
  
  // State management
  const [overlays, setOverlays] = useState([]); 
  const [textInput, setTextInput] = useState(""); // Input for Text
  const [imageInput, setImageInput] = useState(""); // Input for Image URL

  // Load existing overlays from db ONLY when page loads initially
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

  // Function to create a new text overlay
  const addTextOverlay = async () => {
    if (!textInput) return alert("Please enter some text!");
    
    const newOverlayData = {
      content: textInput,
      type: "text",
      x: 50, y: 50, // Default start position
      width: 150, height: 50,
    };

    try {
      // 1. Send to Backend
      const response = await axios.post('http://127.0.0.1:5000/overlays', newOverlayData);
      
      // 2. Create the full object using the ID from backend + our data
      const createdOverlay = { ...newOverlayData, _id: response.data.id, position: {x: 50, y:50}, size: {width: 150, height: 50} };

      // 3. Update Local State (Append new item to list without refreshing others)
      setOverlays(prev => [...prev, createdOverlay]);
      
      setTextInput(""); // Clear input
    } catch (error) {
      console.error("Error creating overlay:", error);
    }
  };

  // Function to add a logo/img overlay
  const addImageOverlay = async () => {
    // Use the input URL or a default one if empty
    const urlToUse = imageInput || "https://cdn-icons-png.flaticon.com/512/5968/5968292.png";
    
    const newOverlayData = {
      content: urlToUse,
      type: "image",
      x: 100, y: 100,
      width: 100, height: 100,
    };

    try {
      const response = await axios.post('http://127.0.0.1:5000/overlays', newOverlayData);
      
      const createdOverlay = { ...newOverlayData, _id: response.data.id, position: {x: 100, y:100}, size: {width: 100, height: 100} };

      setOverlays(prev => [...prev, createdOverlay]);
      setImageInput("");
    } catch (error) {
      console.error("Error creating image:", error);
    }
  };

  // Function to update position/size
  const updateOverlay = async (id, updatedData) => {
    // 1. Update UI Immediately (Optimistic Update)
    setOverlays((prev) =>
      prev.map((o) =>
        o._id === id
          ? { 
              ...o, 
              position: { x: updatedData.x, y: updatedData.y }, 
              size: { width: updatedData.width, height: updatedData.height } 
            }
          : o
      )
    );

    // 2. Send request to backend silently
    try {
        await axios.put(`http://127.0.0.1:5000/overlays/${id}`, {
            x: updatedData.x,
            y: updatedData.y,
            width: updatedData.width,
            height: updatedData.height,
        });
    } catch (error) {
        console.error("Failed to save position");
    }
  };

  // Function to delete overlay
  const deleteOverlay = async (id) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/overlays/${id}`);
      // Remove from local list
      setOverlays(prev => prev.filter(o => o._id !== id));
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  return (
    <div className="container mt-4">
      {/* Controls Area */}
      <div className="row mb-3 justify-content-center">
        <div className="col-md-8 d-flex gap-2">
            {/* Text Input Section */}
            <input
            type="text"
            className="form-control"
            placeholder="Enter text..."
            value={textInput}
            onChange={(e) => setTextInput(e.target.value)}
            />
            <button className="btn btn-primary text-nowrap" onClick={addTextOverlay}>
            Add Text
            </button>
            
            {/* Image Input Section */}
            <input
            type="text"
            className="form-control"
            placeholder="Image URL..."
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
            />
            <button className="btn btn-success text-nowrap" onClick={addImageOverlay}>
            Add Image
            </button>
        </div>
      </div>

      {/* Video Container */}
      <div
        style={{
          position: "relative",
          width: "1280px",
          height: "720px",
          backgroundColor: "black",
          margin: "0 auto",
          overflow: "hidden",
          border: "5px solid #333",
        }}
      >
        <img
          src={videoUrl}
          alt="Live Stream"
          style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />

        {overlays.map((overlay) => (
          <Overlay
            key={overlay._id}
            data={overlay}
            onUpdate={updateOverlay}
            onDelete={deleteOverlay}
          />
        ))}
      </div>
    </div>
  );
};

export default VideoPlayer;