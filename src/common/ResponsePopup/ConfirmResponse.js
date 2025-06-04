import React, { useState } from "react";
import "./responsePopup.css";

function ConfirmResponsePopup(props) {
  const { type, text, onClose, show, onConfirm } = props;

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
        <i className="fa fa-3x fa-info "></i>
      )}
      <p className={"popup_text"}>{text}</p>

      <div style={{ display: "flex", paddingLeft: "30%" }}>
        <button
          onClick={onConfirm}
          className="popup-button"
          style={{ backgroundColor: "#2d8f17" }}
        >
          {"Yes"}
        </button>
        <button
          onClick={onClose}
          className="popup-button"
          style={{ marginLeft: "10%", backgroundColor: "#d73232" }}
        >
          {"No"}
        </button>
      </div>
    </div>
  );
}

export default ConfirmResponsePopup;
