// Comprehensive fix for Vite's WebSocket connection issues in Replit
(() => {
  console.log('[Vite Fix] Applying comprehensive Vite WebSocket fixes');

  // 1. Set up error catching to prevent unhandled rejections
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && typeof event.reason.message === 'string' && 
        (event.reason.message.includes('WebSocket') || 
         event.reason.message.includes('localhost:undefined'))) {
      event.preventDefault();
      console.log('[Vite Fix] Caught and prevented WebSocket error:', event.reason.message);
    }
  }, true);

  // 2. Define variables that Vite checks to disable HMR
  Object.defineProperties(window, {
    '__vite_plugin_react_timeout__': {
      value: null,
      configurable: true, 
      writable: true
    },
    '__vite_plugin_react_preamble_installed__': {
      value: true,
      configurable: true, 
      writable: true
    }
  });

  // 3. Create a proxy for Vite's HMR system
  window.__vite_hmr__ = {
    on: () => {},
    off: () => {},
    send: () => {},
    dispose: () => {},
    data: {}
  };
  
  // 4. Create a fake hot context
  window.hot = {
    accept: () => {},
    dispose: () => {},
    invalidate: () => {},
    decline: () => {},
    on: () => {},
    prune: () => {}
  };

  // 5. Safely replace the WebSocket constructor
  try {
    const OriginalWebSocket = window.WebSocket;
    window.WebSocket = function(url, protocols) {
      try {
        // Directly prevent invalid WebSocket URLs
        if (typeof url === 'string' && url.indexOf('localhost:undefined') >= 0) {
          console.log('[Vite Fix] Blocked invalid WebSocket connection to:', url);
          return {
            addEventListener: () => {},
            removeEventListener: () => {},
            dispatchEvent: () => {},
            send: () => {},
            close: () => {},
            readyState: 3, // CLOSED state
            CONNECTING: 0,
            OPEN: 1,
            CLOSING: 2,
            CLOSED: 3
          };
        }
        
        // For all other WebSocket connections, proceed normally
        return new OriginalWebSocket(url, protocols);
      } catch (err) {
        console.log('[Vite Fix] Error in WebSocket constructor:', err);
        return {
          addEventListener: () => {},
          removeEventListener: () => {},
          dispatchEvent: () => {},
          send: () => {},
          close: () => {},
          readyState: 3
        };
      }
    };
    
    // Copy all properties from original WebSocket
    Object.getOwnPropertyNames(OriginalWebSocket).forEach(key => {
      try {
        window.WebSocket[key] = OriginalWebSocket[key];
      } catch (e) {}
    });
    
    // Maintain prototype chain
    window.WebSocket.prototype = OriginalWebSocket.prototype;
    
    console.log('[Vite Fix] WebSocket constructor patched successfully');
  } catch (err) {
    console.log('[Vite Fix] Error patching WebSocket:', err);
  }
  
  console.log('[Vite Fix] All fixes applied successfully');
})();