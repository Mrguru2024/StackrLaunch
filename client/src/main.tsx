import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Fix for WebSocket connection errors in Replit environment
// This prevents attempts to connect to undefined WebSocket URLs 
if (typeof window !== 'undefined') {
  // Suppress unhandled rejection errors in console
  window.addEventListener('unhandledrejection', (event) => {
    // Check if this is a WebSocket connection error
    if (
      event.reason && 
      event.reason.message && 
      (
        event.reason.message.includes('Failed to construct \'WebSocket\'') ||
        event.reason.message.includes('wss://localhost:undefined')
      )
    ) {
      // Prevent the error from appearing in console
      event.preventDefault();
      event.stopPropagation();
      console.log('[HMR] Suppressed WebSocket connection error');
    }
  });
}

createRoot(document.getElementById("root")!).render(<App />);
