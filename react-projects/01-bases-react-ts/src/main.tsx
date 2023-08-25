// import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // se comenta porque en las animaciones se da un doble renderizado y para evitar confuciones
  // <React.StrictMode>
  <App />
  // </React.StrictMode>,
);
