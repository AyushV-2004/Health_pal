import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { ParallaxProvider } from "react-scroll-parallax";
import { AuthProvider } from "./components/Auth.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <ParallaxProvider>
      <AuthProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
  </AuthProvider>
    </ParallaxProvider>
);
