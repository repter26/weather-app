import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

import LocationBar from "./components/LocationBar";

function App() {
  return (
    <>
      <div className="main-content">
        <nav>
          <h1>Crop Advisor</h1>
          <div>
            <a>Home</a>
            <a>Dashboard</a>
          </div>
        </nav>
        <LocationBar />
      </div>
    </>
  );
}

export default App;
