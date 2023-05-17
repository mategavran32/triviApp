import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import LodaingIndicator from "./components/LodaingIndicator";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <div>
    <App />
    <LodaingIndicator />
  </div>
);
