/**
 * COMPLETE VITE HMR DISABLER
 * 
 * This script completely disables Vite's Hot Module Replacement by:
 * 1. Creating a mock module for @vite/client that does nothing
 * 2. Patching all WebSocket connection attempts
 * 3. Setting global flags to disable HMR functionality
 */

(function() {
  console.log('[HMR-FIX] Installing complete HMR disabler...');
  
  // 1. Completely disable WebSocket to prevent any attempts to connect
  const OrigWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (url && typeof url === 'string' && (
      url.includes('localhost:undefined') || 
      url.includes('undefined/?token=') ||
      url.includes('/__vite_hmr')
    )) {
      console.log('[HMR-FIX] Blocked WebSocket connection to:', url);
      
      // Return a non-functional WebSocket object
      return {
        url: url,
        readyState: 3, // CLOSED
        protocol: '',
        extensions: '',
        bufferedAmount: 0,
        binaryType: 'blob',
        CONNECTING: 0,
        OPEN: 1,
        CLOSING: 2,
        CLOSED: 3,
        onopen: null,
        onerror: null,
        onclose: null,
        onmessage: null,
        close: function(){},
        send: function(){},
        addEventListener: function(){},
        removeEventListener: function(){},
        dispatchEvent: function(){ return true; }
      };
    }
    
    // For any other URLs, use the original WebSocket
    return new OrigWebSocket(url, protocols);
  };
  
  // Preserve the WebSocket prototype and constants
  window.WebSocket.prototype = OrigWebSocket.prototype;
  window.WebSocket.CONNECTING = OrigWebSocket.CONNECTING;
  window.WebSocket.OPEN = OrigWebSocket.OPEN;
  window.WebSocket.CLOSING = OrigWebSocket.CLOSING;
  window.WebSocket.CLOSED = OrigWebSocket.CLOSED;
  
  // 2. Disable all Vite HMR-related global flags
  window.__vite_is_modern_browser = false;
  window.__vite_is_dynamic_import_support = false;
  window.__vite_handle_hmr_update = null;
  window.__vite_hmr = null;
  window.__vite_wb_timeout = null;
  window.VITE_IS_MODERN_BROWSER = false;
  window.__VITE_HMR_ACTIVE = false;
  window.__HMR_ENABLED = false;
  window.__VITE_HMR_TIMEOUT_HANDLER = function(){};
  
  // 3. Create a mechanism to intercept module imports
  const originalImport = window.import || function(){};
  window.import = function(specifier) {
    if (specifier === '/@vite/client' || specifier.includes('@vite/client')) {
      console.log('[HMR-FIX] Intercepted import for', specifier);
      // Return a mock module
      return Promise.resolve({
        createHotContext: () => ({
          accept: () => {},
          dispose: () => {},
          prune: () => {},
          decline: () => {},
          invalidate: () => {},
          on: () => {}
        }),
        updateModule: () => {},
        removeModule: () => {},
        createHmrRefresh: () => {},
        importModule: () => Promise.resolve({}),
        reload: () => {},
        webSocketClient: {
          send: () => {},
          onMessage: () => {},
          connect: () => {}
        }
      });
    }
    return originalImport.apply(this, arguments);
  };
  
  // 4. Prevent unhandled promise rejections related to WebSocket
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && 
        (event.reason.message && event.reason.message.includes('WebSocket')) || 
        (event.reason.stack && event.reason.stack.includes('WebSocket'))) {
      console.log('[HMR-FIX] Suppressed unhandled rejection related to WebSocket');
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  
  console.log('[HMR-FIX] HMR disabler installed successfully');
})();