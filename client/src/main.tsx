import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker to block WebSocket connections
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/no-websocket-sw.js')
      .then(registration => {
        console.log('Service Worker for blocking WebSockets registered successfully');
      })
      .catch(error => {
        console.log('Service Worker registration failed:', error);
      });
  });
}

// Create a global variable that will be checked by Vite HMR
// @ts-ignore
window.__VITE_IS_MODERN_BROWSER = false;
// @ts-ignore
window.__VITE_HMR_TIMEOUT_FIRED__ = true;
// @ts-ignore
window.__VITE_HMR_DISABLED__ = true;

// Complete WebSocket blocking for Vite HMR
// This effectively disables all HMR functionality while preventing errors
// @ts-ignore
window.__vite_plugin_react_preamble_installed__ = true;

// Block all WebSocket connections to invalid URLs
// Replace the WebSocket constructor to block invalid connections
const OriginalWebSocket = window.WebSocket;
// @ts-ignore
window.WebSocket = function(url, protocols) {
  if (!url || url.includes('undefined') || (url.includes('localhost') && url.includes('token='))) {
    console.log('[HMR Disabled] Blocked WebSocket connection to:', url);
    return {
      send: () => {},
      close: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
      readyState: 3, // CLOSED
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2,
      CLOSED: 3
    };
  }
  return new OriginalWebSocket(url, protocols);
};

// Block unhandled rejections from WebSocket errors
window.addEventListener('unhandledrejection', event => {
  if (event.reason?.message?.includes('WebSocket') || 
      event.reason?.message?.includes('localhost:undefined')) {
    event.preventDefault();
    console.log('[Error blocked] WebSocket connection error suppressed');
    return false;
  }
});

createRoot(document.getElementById("root")!).render(<App />);
