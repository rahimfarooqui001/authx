import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "./context/AuthContext";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
     
<Toaster
  position="top-center"
  toastOptions={{
    duration: 3000,
    style: {
      background: "linear-gradient(135deg, rgba(212,175,55,0.25), rgba(176,137,47,0.20))",
      color: "#f7d778",
      border: "1px solid rgba(212,175,55,0.35)",
      backdropFilter: "blur(12px)",
      boxShadow: "0 4px 20px rgba(212,175,55,0.30)",
      borderRadius: "14px",
      fontWeight: 600,
      letterSpacing: "0.5px"
    },

  
    success: {
      style: {
        background:
          "linear-gradient(135deg, rgba(34,197,94,0.25), rgba(22,163,74,0.2))",
        color: "#bbf7d0",
        border: "1px solid rgba(34,197,94,0.4)",
        boxShadow: "0 4px 18px rgba(34,197,94,0.25)"
      },
      iconTheme: {
        primary: "#4ade80",  
        secondary: "black"
      }
    },

    error: {
      style: {
        background:
          "linear-gradient(135deg, rgba(239,68,68,0.25), rgba(220,38,38,0.2))",
        color: "#fecaca",
        border: "1px solid rgba(239,68,68,0.4)",
        boxShadow: "0 4px 18px rgba(239,68,68,0.25)"
      },
      iconTheme: {
        primary: "#f87171",  
        secondary: "black"
      }
    }
  }}
/>


      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

