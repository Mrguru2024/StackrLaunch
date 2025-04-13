/**
 * Vite WebSocket Port Fix
 * 
 * This script specifically addresses the "Failed to construct 'WebSocket': The URL 'wss://localhost:undefined/?token=...' is invalid" error
 * by patching the WebSocket constructor to use a valid port.
 */

(function() {
  console.log('[vite-port-fix] Setting up port-specific WebSocket fix');

  // Define the expected port for WebSockets
  const VITE_PORT = '5000';

  // Store the original WebSocket constructor
  const OriginalWebSocket = window.WebSocket;

  // Patch the WebSocket constructor to replace undefined port with actual port
  window.WebSocket = function(url, protocols) {
    try {
      if (url && typeof url === 'string') {
        // Fix the invalid WebSocket URL with undefined port
        if (url.includes('localhost:undefined')) {
          const fixedUrl = url.replace('localhost:undefined', 'localhost:' + VITE_PORT);
          console.log('[vite-port-fix] Fixed WebSocket URL:', fixedUrl);
          
          // Create WebSocket with fixed URL
          return new OriginalWebSocket(fixedUrl, protocols);
        }
      }
      
      // For all other URLs, use the original WebSocket constructor
      return new OriginalWebSocket(url, protocols);
    } catch (err) {
      console.log('[vite-port-fix] Error in WebSocket constructor:', err.message);
      
      // Return a mock WebSocket to prevent further errors
      return {
        addEventListener: function() {},
        removeEventListener: function() {},
        send: function() {},
        close: function() {},
        readyState: 3, // CLOSED
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
        onopen: null,
        onclose: null,
        onerror: null,
        onmessage: null
      };
    }
  };

  // Preserve original WebSocket static properties and prototype
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;

  // Also set up environment variables that Vite might check
  window.env = window.env || {};
  window.env.VITE_PORT = VITE_PORT;
  
  // Export port information to global scope
  window.VITE_PORT = VITE_PORT;
  window.__vite_port__ = VITE_PORT;
  window.__vite_ws_port__ = VITE_PORT;
  
  console.log('[vite-port-fix] WebSocket port fix applied successfully');
})();