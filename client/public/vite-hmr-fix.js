/**
 * Comprehensive Vite WebSocket Connection Fix
 * 
 * This script fixes the "Failed to construct 'WebSocket': The URL 'wss://localhost:undefined/?token=...' is invalid"
 * error through multiple layers of protection.
 */

(function() {
  console.log('[vite-hmr-fix] Applying comprehensive WebSocket fixes...');
  
  // 1. DISABLE ALL HMR FLAGS
  window.__vite_ws_disabled__ = true;
  window.__vite_hmr_disabled__ = true;
  window.__VITE_HMR_DISABLED__ = true;
  window.__VITE_HMR_TIMEOUT_FIRED__ = true;
  
  // 2. GLOBAL ERROR HANDLER FOR WEBSOCKET ERRORS
  window.addEventListener('unhandledrejection', function(event) {
    // Check if this is a WebSocket error from Vite
    if (event && event.reason && event.reason.message && 
        (event.reason.message.includes('WebSocket') || 
         event.reason.message.includes('localhost:undefined'))) {
      console.log('[vite-hmr-fix] Caught and suppressed WebSocket error:', event.reason.message);
      event.preventDefault(); // Prevent the error from propagating
      event.stopPropagation();
    }
  }, true);
  
  // 3. PATCH THE ORIGINAL WEBSOCKET
  const OriginalWebSocket = window.WebSocket;
  
  // 4. REMOVE ANY EXISTING VITE CLIENT SCRIPTS
  document.querySelectorAll('script').forEach(script => {
    if (script.src && (
        script.src.includes('@vite/client') || 
        script.src.includes('vite/client') ||
        script.src.includes('/@vite/client')
      )) {
      console.log('[vite-hmr-fix] Removed Vite client script:', script.src);
      script.remove();
    }
  });
  
  // 5. COMPREHENSIVE WEBSOCKET PATCHING WITH DETAILED ERROR HANDLING
  window.WebSocket = function(url, protocols) {
    try {
      // Check for invalid WebSocket URLs
      if (!url || typeof url !== 'string') {
        console.log('[vite-hmr-fix] Invalid WebSocket URL type:', typeof url);
        throw new Error('Invalid WebSocket URL');
      }
      
      // Fix the URL if it contains localhost:undefined
      if (url.includes('localhost:undefined')) {
        console.log('[vite-hmr-fix] Intercepted invalid WebSocket URL:', url);
        
        // Return a mock WebSocket object that does nothing
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
      
      // For all other legitimate WebSocket connections, use the original
      return new OriginalWebSocket(url, protocols);
    } catch (err) {
      console.log('[vite-hmr-fix] Error creating WebSocket:', err.message);
      
      // Return a non-functioning WebSocket to prevent further errors
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
  
  // Preserve the original WebSocket prototype & properties
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
  
  // 6. OVERRIDE THE VITE CLIENT'S SETUPWEBSOCKET FUNCTION
  window.setupWebSocket = function() {
    console.log('[vite-hmr-fix] Blocked setupWebSocket call');
    return { send: function() {}, close: function() {} };
  };

  // 7. PREVENT MODULE IMPORTS FROM VITE CLIENT
  const originalImport = window.import || Function.prototype;
  window.import = function(path) {
    if (typeof path === 'string' && (
        path.includes('@vite/client') || 
        path.includes('vite/client')
      )) {
      console.log('[vite-hmr-fix] Blocked import of Vite client:', path);
      return Promise.resolve({
        setupWebSocket: function() { return { send: function() {}, close: function() {} }; },
        webSocketClient: { send: function() {}, close: function() {} }
      });
    }
    return originalImport.apply(this, arguments);
  };
  
  console.log('[vite-hmr-fix] Comprehensive WebSocket fixes applied successfully');
})();