import React from "react";
import Routes from "./Routes";

function App() {
  console.log("App component rendering...");
  
  try {
    return (
      <Routes />
    );
  } catch (error) {
    console.error("Error in App component:", error);
    return (
      <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1 style={{ color: "red" }}>App Error</h1>
        <p>{error.message}</p>
        <pre>{error.stack}</pre>
      </div>
    );
  }
}

export default App;
