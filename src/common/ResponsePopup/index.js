import React, { useState } from "react";
import "./responsePopup.css";
function ResponsePopup(props) {
  const { type, text, onClose, show } = props;

  return (
    <div
      className={`popup`}
      style={{
        display: show ? "block" : "none",
        width: "40%",
      }}
    >
      {type === "success" ? (
        <i className="fa fa-3x fa-check success-icon"></i>
      ) : (
        <i className="fa fa-3x fa-info error-icon"></i>
      )}
      <p className={"popup_text"}>{text}</p>

      <button onClick={onClose} className="popup-button">
        {"OK"}
      </button>
    </div>
  );
}

export default ResponsePopup;
