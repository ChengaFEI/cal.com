import React, { useState } from "react";

import router from "./router";

const FloatingIcon = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");

  const toggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    // Handle the confirm button click, you can add your logic here
    // console.log("Input Value:", inputValue);
    // Close the window after confirming (optional)
    // setIsWindowOpen(false);
    router(inputValue);
  };

  const handleWindowClick = (e: any) => {
    // Stop the click event propagation within the window's content
    e.stopPropagation();
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        cursor: "pointer",
        zIndex: 1000,
      }}
      onClick={toggleWindow}>
      <div
        style={{
          backgroundColor: isWindowOpen ? "#ff6347" : "#007bff",
          color: "#000",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "20px",
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
          transition: "background-color 0.3s ease",
        }}>
        &#x263C;
      </div>
      {isWindowOpen && (
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            right: "0",
            border: "1px solid #ccc",
            borderRadius: "8px",
            padding: "10px",
            backgroundColor: "#000",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.2)",
            display: "block",
          }}
          onClick={handleWindowClick} // Handle click within the window
        >
          <div style={{ width: "20rem", position: "relative" }}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              placeholder="Enter text..."
              style={{
                background: "black",
                border: "2px solid white",
                borderRadius: "50px",
                padding: "1rem 2rem",
                width: "100%",
              }}
            />
            <button
              onClick={handleConfirmClick}
              style={{
                color: "black",
                background: "white",
                borderRadius: "50px",
                aspectRatio: "1",
                height: "80%",
                position: "absolute",
                top: "10%",
                right: "5px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 24 24"
                stroke-width="2"
                stroke="currentColor"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M5 12l14 0" />
                <path d="M13 18l6 -6" />
                <path d="M13 6l6 6" />
              </svg>
            </button>
            {/* <button
              onClick={handleConfirmClick}
              style={{
                backgroundColor: "white",
                borderRadius: "50%",
                height: "80%",
                aspectRatio: "1",
                position: "absolute",
                right: "0",
                transform: "translateX(-10%)",
                top: "10%",
              }}>
              Confirm
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
