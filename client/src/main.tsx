// Import vite stub first to prevent any HMR imports
import "./vite-stub";
import { hmrFixer } from "./vite-hmr-fix";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Setup HMR fixes before rendering
if (typeof window !== "undefined") {
  try {
    // Hide any console errors related to WebSocket connections
    const originalConsoleError = console.error;
    console.error = function(...args) {
      if (args.length > 0 && 
         (typeof args[0] === 'string') && 
         (args[0].includes('WebSocket') || args[0].includes('wss://'))) {
        return; // Silently ignore WebSocket-related errors
      }
      return originalConsoleError.apply(this, args);
    };
  } catch (e) {
    console.log("Error setting up error suppression:", e);
  }
}

// Render the app
createRoot(document.getElementById("root")!).render(<App />);
