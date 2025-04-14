// Completely disable Vite's Hot Module Replacement to prevent WebSocket errors
console.log('[HMR] Disabling Vite Hot Module Replacement');

// This script runs before Vite's client script
window.__VITE_HMR_DISABLED__ = true;

// Replace the WebSocket constructor to block HMR connections
const originalWebSocket = window.WebSocket;
window.WebSocket = function(url, protocols) {
  if (url && url.includes('localhost') && url.includes('token=')) {
    console.log('[HMR] Blocked WebSocket connection:', url);
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
  return new originalWebSocket(url, protocols);
};

// Block Vite's client imports
window.__VITE_BLOCK_CLIENT__ = true;