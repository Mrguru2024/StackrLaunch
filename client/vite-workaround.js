// This file patches Vite's Hot Module Replacement (HMR) in Replit environment
// It works around the WebSocket connection errors in the console

// Wait for the document to load
document.addEventListener('DOMContentLoaded', () => {
  // Check if Vite's HMR system is trying to reconnect with invalid WebSocket URLs
  const originalWebSocket = window.WebSocket;
  
  window.WebSocket = function(url, protocols) {
    // Intercept WebSocket connections
    if (url && url.includes('wss://localhost:undefined')) {
      // Don't actually create invalid WebSocket connections
      console.log('[WebSocket Interceptor] Preventing invalid WebSocket connection to:', url);
      
      // Return a mock WebSocket object that does nothing
      return {
        send: () => {},
        close: () => {},
        addEventListener: () => {},
        removeEventListener: () => {},
        readyState: 3, // CLOSED
      };
    }
    
    // Create normal WebSocket connections for valid URLs
    return new originalWebSocket(url, protocols);
  };
  
  console.log('[WebSocket Interceptor] Patched WebSocket to prevent connection errors');
});