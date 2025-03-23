import React from "react";
import "./ArcadeAlert.css";

const ArcadeAlert = ({ message, onClose }) => {
  return (
    <div className="arcade-alert">
      <div className="alert-screen">
        <p>{message}</p>
        <button onClick={onClose}>OK</button>
      </div>
    </div>
  );
};

export default ArcadeAlert;
