import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./styles/tailwind.css";
import "./styles/index.css";

console.log("Starting React app...");

const container = document.getElementById("root");
if (!container) {
  console.error("Root element not found!");
  throw new Error("Root element not found. Make sure there is a div with id='root' in your HTML.");
}

console.log("Root container found:", container);

try {
  const root = createRoot(container);
  console.log("Creating root...");
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
  
  console.log("App rendered successfully!");
} catch (error) {
  console.error("Error rendering app:", error);
  container.innerHTML = `
    <div style="padding: 20px; font-family: Arial; color: red;">
      <h1>Error Loading Application</h1>
      <p>${error.message}</p>
      <pre>${error.stack}</pre>
    </div>
  `;
}
