/**
 * COMPLETE VITE CLIENT BYPASS
 * 
 * This script completely bypasses Vite's client functionality by:
 * 1. Completely preventing module imports of @vite/client
 * 2. Redirecting all fetch attempts for Vite's client to a stub version
 * 3. Disabling all WebSocket connections for HMR
 */

(function() {
  console.log('[VITE-BYPASS] Installing Vite Client bypass...');

  // ==========================
  // PART 1: PREVENT MODULE IMPORTS
  // ==========================
  
  // Store original import function
  const originalDynamicImport = window.import || (() => Promise.resolve({}));
  
  // Completely block any imports related to Vite's client
  window.import = function(specifier) {
    if (typeof specifier === 'string' && (
        specifier.includes('/@vite/client') || 
        specifier.includes('@vite/client')
    )) {
      console.log('[VITE-BYPASS] Blocked import of', specifier);
      
      // Return empty module that does nothing
      return Promise.resolve({
        createHotContext: () => ({
          accept: () => {},
          dispose: () => {},
          prune: () => {},
          decline: () => {},
          invalidate: () => {},
          on: () => {}
        }),
        updateStyle: () => {},
        removeStyle: () => {},
        fetchUpdate: () => Promise.resolve(),
        webSocketClient: {
          send: () => {},
          onMessage: () => {},
          close: () => {},
          connect: () => {}
        }
      });
    }
    
    // Pass through all other imports
    return originalDynamicImport.apply(this, arguments);
  };
  
  // ==========================
  // PART 2: REDIRECT FETCH REQUESTS
  // ==========================
  
  // Intercept fetch requests for Vite client
  const originalFetch = window.fetch;
  window.fetch = function(input, init) {
    if (typeof input === 'string' && input.includes('/@vite/client')) {
      console.log('[VITE-BYPASS] Blocked fetch of', input);
      
      // Return empty response
      return Promise.resolve(new Response('/* Empty Vite client stub */', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript' }
      }));
    }
    
    // Pass through all other fetch requests
    return originalFetch.apply(this, arguments);
  };
  
  // ==========================
  // PART 3: DISABLE WEBSOCKET CONNECTIONS
  // ==========================
  
  // Completely replace WebSocket for Vite connections
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (typeof url === 'string' && (
        url.includes('/__vite_hmr') || 
        url.includes('localhost:undefined') ||
        url.includes('vite-hmr')
    )) {
      console.log('[VITE-BYPASS] Blocked WebSocket connection to', url);
      
      // Return a fake WebSocket that never connects
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
    return new OriginalWebSocket(url, protocols);
  };
  
  // Make it look like a proper constructor
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  Object.defineProperties(window.WebSocket, {
    CONNECTING: { value: OriginalWebSocket.CONNECTING },
    OPEN: { value: OriginalWebSocket.OPEN },
    CLOSING: { value: OriginalWebSocket.CLOSING },
    CLOSED: { value: OriginalWebSocket.CLOSED }
  });
  
  // ==========================
  // PART 4: SET HMR ENVIRONMENT VARIABLES
  // ==========================
  
  // Disable all Vite HMR flags
  window.__vite_hmr_port = null;
  window.__vite_hmr_protocol = null;
  window.__vite_hmr_hostname = null;
  window.__HMR_ENABLED = false;
  window.__VITE_HMR_ACTIVE = false;
  window.__vite_is_modern_browser = false;
  
  // Suppress specific WebSocket errors
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && (
        (event.reason.message && event.reason.message.includes('WebSocket')) ||
        (event.reason.stack && event.reason.stack.includes('WebSocket'))
    )) {
      console.log('[VITE-BYPASS] Suppressed unhandled rejection:', event.reason.message || 'WebSocket error');
      event.preventDefault();
    }
  }, true);
  
  console.log('[VITE-BYPASS] Vite Client bypass installed successfully!');
})();