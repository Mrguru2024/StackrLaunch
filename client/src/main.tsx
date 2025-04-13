import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Completely disable Vite HMR system to prevent console errors
if (typeof window !== 'undefined') {
  // Define global variables to disable HMR
  // @ts-ignore
  window.__vite_hmr__ = { dispose: () => {}, data: {} };
  // @ts-ignore
  window.__VITE_HMR_DISABLED__ = true;
  
  // Intercept and suppress all WebSocket-related errors
  window.addEventListener('error', (event) => {
    if (event.message && event.message.includes('WebSocket')) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Intercept promise rejections related to WebSockets
  window.addEventListener('unhandledrejection', (event) => {
    if (event.reason && event.reason.message && (
      event.reason.message.includes('WebSocket') || 
      event.reason.message.includes('wss://localhost')
    )) {
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Replace the WebSocket constructor to block HMR connections
  const originalWebSocket = window.WebSocket;
  // @ts-ignore
  window.WebSocket = function(url, protocols) {
    if (url && (url.includes('localhost') || url.includes('undefined'))) {
      console.log('[HMR] Blocked invalid WebSocket connection');
      return {
        send: () => {},
        close: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        dispatchEvent: () => false,
        readyState: 3 // CLOSED
      };
    }
    return new originalWebSocket(url, protocols);
  };
}

createRoot(document.getElementById("root")!).render(<App />);
