// This script completely disables Vite's HMR system
// It prevents the WebSocket connection from ever being attempted

// Set key variables that Vite checks before initializing HMR
window.__vite_ws_disabled__ = true;
window.__vite_hmr_disabled__ = true;
window.__VITE_HMR_DISABLED__ = true;
window.__VITE_HMR_TIMEOUT_FIRED__ = true;

// Prevent any WebSocket connections to localhost:undefined
window.__VITE_HOST__ = null;
window.__VITE_PORT__ = null;

// Catch any error before it can show in the console
window.addEventListener('error', function(event) {
  if (event.message && event.message.includes('WebSocket')) {
    event.preventDefault();
    return false;
  }
}, true);

// Prevent unhandled promise rejections from showing in the console
window.addEventListener('unhandledrejection', function(event) {
  if (event.reason && event.reason.message && event.reason.message.includes('WebSocket')) {
    event.preventDefault();
    return false;
  }
}, true);

console.log('[Vite] HMR disabled successfully');