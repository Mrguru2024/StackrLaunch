/**
 * Vite WebSocket Connection Fix
 * 
 * This script fixes the "Failed to construct 'WebSocket': The URL 'wss://localhost:undefined/?token=...' is invalid"
 * error by patching the Vite client's setupWebSocket function.
 */

(function() {
  console.log('[vite-hmr-fix] Applying WebSocket connection fix...');
  
  // Disable HMR completely
  window.__vite_hmr_disabled__ = true;
  window.__VITE_HMR_DISABLED__ = true;
  window.__VITE_HMR_TIMEOUT_FIRED__ = true;
  
  // Keep track of original WebSocket
  const OriginalWebSocket = window.WebSocket;
  
  // Override setupWebSocket function when it's loaded
  const originalSetupWebSocket = window.setupWebSocket;
  window.setupWebSocket = function(options) {
    console.log('[vite-hmr-fix] Intercepted setupWebSocket call');
    
    // Do nothing if function is called
    return {
      send: () => {},
      close: () => {}
    };
  };
  
  // Patch WebSocket constructor to handle invalid URLs
  window.WebSocket = function(url, protocols) {
    // Check if this is a Vite HMR connection with invalid port
    if (url && typeof url === 'string' && url.includes('localhost:undefined')) {
      console.log('[vite-hmr-fix] Blocked invalid WebSocket connection:', url);
      
      // Return a mock WebSocket that does nothing
      return {
        addEventListener: () => {},
        removeEventListener: () => {},
        send: () => {},
        close: () => {},
        readyState: 3, // CLOSED
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3
      };
    }
    
    // For all other WebSocket connections, use the original implementation
    return new OriginalWebSocket(url, protocols);
  };
  
  // Preserve the original WebSocket prototype
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  
  // Preserve original WebSocket static properties
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
  
  console.log('[vite-hmr-fix] WebSocket fix applied successfully');
})();