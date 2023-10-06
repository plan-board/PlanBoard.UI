import React from "react";
import "./Popup.css";

function Popup({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content" style={{ width: "70%" }}>
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
}

export default Popup;
