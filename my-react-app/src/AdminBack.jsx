import React from "react";
import adminPanelImage from "./image/pic1.jpg"; // Correct path to your image

export default function AdminBack({ children }) {
  return (
    <div
      style={{
        backgroundImage: `url(${adminPanelImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh", // Ensures it covers the full height
        width: "100%", // Ensures it spans the full width
      }}
    >
      {children}
    </div>
  );
}
