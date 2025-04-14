// Simplified main file - no HMR imports
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Simple error handling
try {
  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
    console.log("App rendered successfully");
  } else {
    console.error("Root element not found");
  }
} catch (err) {
  console.error("Error rendering app:", err);
}
