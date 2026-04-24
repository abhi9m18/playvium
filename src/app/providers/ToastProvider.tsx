"use client";

import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import type { ToastPosition } from "react-hot-toast";

export default function ToastProvider() {
  const [position, setPosition] = useState<ToastPosition>("top-right");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        setPosition("top-center");
      } else {
        setPosition("top-right");
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <Toaster
      position={position}
      toastOptions={{
        duration: 3000,
        style: {
          background: "#242B35",
          color: "#ffffff",
          borderRadius: "12px",
          border: "1px solid #2a2e38",
          padding: "12px 16px",
          fontSize: "14px",
          textAlign: "center",
          zIndex: "999999",
          maxWidth: "90vw",
        },

        success: {
          iconTheme: {
            primary: "#0CB826",
            secondary: "#242B35",
          },
        },

        error: {
          iconTheme: {
            primary: "#ff4d4f",
            secondary: "#242B35",
          },
        },
      }}
    />
  );
}
