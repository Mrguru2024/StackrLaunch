/**
 * WebSocket Port Fix for Replit Environment
 * 
 * This script runs before Vite and patches the WebSocket constructor
 * to ensure it always uses the correct port when Vite tries to connect.
 */

(function() {
  // Store the original WebSocket constructor
  const OriginalWebSocket = window.WebSocket;
  
  // Create a patched WebSocket class
  class PatchedWebSocket extends OriginalWebSocket {
    constructor(url, protocols) {
      // Check if this is a Vite HMR WebSocket connection
      if (url && url.includes('localhost:undefined')) {
        // Replace the undefined port with our server port (5000)
        const fixedUrl = url.replace('localhost:undefined', 'localhost:5000');
        // Call the original constructor with the fixed URL
        super(fixedUrl, protocols);
      } else {
        // For all other WebSocket connections, use the original URL
        super(url, protocols);
      }
    }
  }
  
  // Replace the global WebSocket with our patched version
  window.WebSocket = PatchedWebSocket;
  
  console.log('[Websocket Fix] Patched WebSocket constructor to use correct port');
})();