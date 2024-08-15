"use client";
import React from "react";
import "./main.css";

function Main({ children }) {
  return (
    <main
      id="main"
      className="main"
      style={{
        minHeight: "100vh",
      }}
    >
      {children}
    </main>
  );
}

export default Main;
