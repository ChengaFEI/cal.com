import React, { useState } from "react";

import { useGetTheme } from "@calcom/lib/hooks/useTheme";

type chatResponse = {
  type: string;
  message: string;
};

const FloatingIcon = () => {
  const [isWindowOpen, setIsWindowOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [chatLog, setChatLog] = useState<chatResponse[]>([]);
  const { resolvedTheme, forcedTheme } = useGetTheme();
  const hasDarkTheme = !forcedTheme && resolvedTheme === "dark";
  const darkThemeColors = {
    /** Dark Theme starts */
    //primary - Border when selected and Selected Option background
    primary: "rgb(41 41 41 / var(--tw-border-opacity))",

    neutral0: "rgb(62 62 62 / var(--tw-bg-opacity))",
    // Down Arrow  hover color
    neutral5: "white",

    neutral10: "rgb(41 41 41 / var(--tw-border-opacity))",

    // neutral20 - border color + down arrow default color
    neutral20: "rgb(41 41 41 / var(--tw-border-opacity))",

    // neutral30 - hover border color
    neutral30: "rgb(41 41 41 / var(--tw-border-opacity))",

    neutral40: "white",

    danger: "white",

    // Cross button in multiselect
    dangerLight: "rgb(41 41 41 / var(--tw-border-opacity))",

    // neutral50 - MultiSelect - "Select Text" color
    neutral50: "white",

    // neutral60 - Down Arrow color
    neutral60: "white",

    neutral70: "red",

    // neutral80 - Selected option
    neutral80: "white",

    neutral90: "blue",

    primary50: "rgba(209 , 213, 219, var(--tw-bg-opacity))",
    primary25: "rgba(244, 245, 246, var(--tw-bg-opacity))",
    /** Dark Theme ends */
  };

  const toggleWindow = () => {
    setIsWindowOpen(!isWindowOpen);
  };

  const handleInputChange = (e: any) => {
    setInputValue(e.target.value);
  };

  const handleConfirmClick = () => {
    const responses: chatResponse[] = [];

    const currentResponse: chatResponse = {
      type: "human",
      message: inputValue,
    };
    responses.push(currentResponse);

    // const chatResponse = Promise.resolve(router(inputValue));

    // chatResponse.then((value) => {
    //   console.log("Response: ", value);

    //   const aiResponse: chatResponse = {
    //     type: "aiResponse",
    //     message: value.url_param,
    //   };

    //   responses.push(aiResponse);
    //   setChatLog([...chatLog, ...responses]);
    // });
    setChatLog([...chatLog, ...responses]);
    setInputValue("");
  };

  const handleWindowClick = (e: any) => {
    // Stop the click event propagation within the window's content
    e.stopPropagation();
  };

  const renderChatLog = chatLog.map((val) => {
    return val.type === "aiResponse" ? (
      <div
        key={val.message}
        style={{
          color: "white",
          width: "fit-content",
          border: "1px solid white",
          margin: "1rem 0 1rem 0",
          borderRadius: "30px",
          padding: "0.5rem 1rem",
          maxWidth: "80%",
        }}>
        {val.message}
      </div>
    ) : (
      <div
        key={val.message}
        style={{ width: "100%", display: "flex", justifyContent: "flex-end", margin: "1rem 0 1rem 0" }}>
        <div
          style={{
            color: "white",
            width: "fit-content",
            border: "1px solid white",

            borderRadius: "30px",
            padding: "0.5rem 1rem",
            maxWidth: "80%",
          }}>
          {val.message}
        </div>
      </div>
    );
  });

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
          color: hasDarkTheme ? "#000" : "#fff",
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
          <div style={{ height: "80vh", width: "20rem" }}>
            <div
              style={{
                height: "100%",
                overflow: "scroll",
                paddingBottom: "5rem",
              }}>
              {renderChatLog}
            </div>
            <div style={{ width: "20rem", position: "absolute", bottom: "0", marginBottom: "10px" }}>
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter text..."
                style={{
                  color: "white",
                  background: "black",
                  border: "2px solid white",
                  borderRadius: "50px",
                  padding: "1rem 4rem 1rem 2rem",
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
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FloatingIcon;
