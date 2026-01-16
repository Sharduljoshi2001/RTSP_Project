import React from "react";
import { Rnd } from "react-rnd";
import { FaTimes } from "react-icons/fa";

const Overlay = ({ data, onUpdate, onDelete }) => {
  
  // When dragging stops, we tell the parent (VideoPlayer) to update state
  const handleDragStop = (e, d) => {
    onUpdate(data._id, { 
        x: d.x, 
        y: d.y, 
        width: data.size.width, 
        height: data.size.height 
    });
  };

  // When resizing stops, we capture new width/height
  const handleResizeStop = (e, direction, ref, delta, position) => {
    onUpdate(data._id, {
      width: parseInt(ref.style.width),
      height: parseInt(ref.style.height),
      x: position.x,
      y: position.y
    });
  };

  return (
    <Rnd
      // We bind size and position directly to the data from parent
      size={{ width: data.size.width, height: data.size.height }}
      position={{ x: data.position.x, y: data.position.y }}
      
      bounds="parent"
      onDragStop={handleDragStop}
      onResizeStop={handleResizeStop}
      
      style={{
        border: "2px dashed #00ff00",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // Using a ternary operator: If image, no background. If text, semi-transparent background.
        backgroundColor: data.type === 'image' ? 'transparent' : "rgba(0,0,0,0.5)",
        cursor: "move",
      }}
    >
      {/* Delete Button */}
      <div
        onClick={(e) => {
            e.stopPropagation(); // Prevent drag start when clicking delete
            onDelete(data._id);
        }}
        style={{
          position: "absolute",
          top: -12,
          right: -12,
          background: "red",
          borderRadius: "50%",
          width: '24px',
          height: '24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: "pointer",
          zIndex: 100, // Ensure it's on top
          border: '2px solid white'
        }}
      >
        <FaTimes color="white" size={12} />
      </div>

      {/* Content */}
      {data.type === "image" ? (
        <img
          src={data.content}
          alt="overlay"
          draggable="false" // Prevent browser's native image dragging
          style={{ width: "100%", height: "100%", pointerEvents: 'none' }} // pointerEvents none lets clicks pass through to Rnd
        />
      ) : (
        <span
          style={{ 
            color: "white", 
            fontWeight: "bold", 
            fontSize: "1.2rem",
            userSelect: "none" // Prevent text highlighting while dragging
          }}
        >
          {data.content}
        </span>
      )}
    </Rnd>
  );
};

export default Overlay;