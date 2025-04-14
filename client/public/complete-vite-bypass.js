/**
 * COMPLETE VITE CLIENT BYPASS
 * 
 * This script completely bypasses Vite's client functionality by:
 * 1. Completely preventing module imports of @vite/client
 * 2. Redirecting all fetch attempts for Vite's client to a stub version
 * 3. Disabling all WebSocket connections for HMR
 */

(function() {
  console.log("[VITE-BYPASS] Starting complete Vite client bypass system...");
  
  // TRAP 1: Block all WebSocket connections with "undefined" in the URL
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (typeof url === 'string' && (
        url.includes('undefined') || 
        url.includes('/__vite_hmr') ||
        url.includes('vite') || 
        url.includes('hmr')
    )) {
      console.log("[VITE-BYPASS] Preventing WebSocket connection to:", url);
      
      // Return a fake WebSocket that immediately triggers error
      const fakeSocket = {
        url: url,
        protocol: '',
        readyState: 3, // CLOSED
        extensions: '',
        bufferedAmount: 0,
        binaryType: 'blob',
        onopen: null,
        onmessage: null,
        onclose: null,
        onerror: null,
        close: function() {},
        send: function() {},
        addEventListener: function(type, listener) {
          if (type === 'error') {
            // Immediately trigger error
            setTimeout(() => {
              if (typeof listener === 'function') {
                listener(new ErrorEvent('error', { 
                  message: 'Connection blocked by vite-bypass.js'
                }));
              }
            }, 0);
          }
        },
        removeEventListener: function() {},
        dispatchEvent: function() { return true; }
      };
      
      // Immediately trigger error to satisfy Vite
      setTimeout(function() {
        if (typeof fakeSocket.onerror === 'function') {
          fakeSocket.onerror(new ErrorEvent('error', {
            message: 'Connection blocked by vite-bypass.js'
          }));
        }
      }, 0);
      
      return fakeSocket;
    }
    
    // Pass through for non-Vite WebSockets
    return new OriginalWebSocket(url, protocols);
  };
  
  // Copy static properties
  window.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
  window.WebSocket.OPEN = OriginalWebSocket.OPEN;
  window.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
  window.WebSocket.CLOSED = OriginalWebSocket.CLOSED;
  
  // TRAP 2: Block all imports of @vite/client
  // Create mock module for @vite/client
  const mockViteClient = {
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
    webSocketClient: {
      send: () => {}
    }
  };
  
  // Override import.meta for Vite's HMR
  try {
    Object.defineProperty(import.meta, 'hot', {
      get: function() {
        return null;
      },
      configurable: true
    });
  } catch (e) {
    console.log("[VITE-BYPASS] Unable to override import.meta.hot:", e);
  }
  
  // TRAP 3: Hide all console messages from Vite
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    if (args.length > 0 && 
        typeof args[0] === 'string' && 
        args[0].includes('[vite]')) {
      // Drop this log
      return;
    }
    return originalConsoleLog.apply(this, args);
  };
  
  // TRAP 4: Intercept all fetch requests to @vite/client
  const originalFetch = window.fetch;
  window.fetch = function(resource, init) {
    if (resource && typeof resource === 'string' && 
        (resource.includes('@vite/client') || 
         resource.includes('/__vite_hmr') ||
         resource.includes('vite'))) {
      
      console.log("[VITE-BYPASS] Intercepting fetch for:", resource);
      
      // Return stub module
      return Promise.resolve(new Response(
        'export function createHotContext() { return { accept: () => {} }; }', 
        { 
          status: 200, 
          headers: new Headers({ 'Content-Type': 'application/javascript' })
        }
      ));
    }
    
    return originalFetch.apply(this, arguments);
  };
  
  // TRAP 5: Catch and prevent HMR events
  window.addEventListener('vite:beforeUpdate', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);
  
  window.addEventListener('vite:invalidate', function(e) {
    e.preventDefault();
    e.stopPropagation();
    return false;
  }, true);
  
  // TRAP 6: Set global flags to completely kill HMR
  window.__vite_is_modern_browser = false;
  window.__vite_is_dynamic_import_support = false;
  window.__vite_hmr = null;
  window.__vite_hmr_timeout = null;
  window.__hmrDirtyComponents = new Set();
  window.__VUE_HMR_RUNTIME = null;
  window.__VITE_HMR_ACTIVE = false;
  
  console.log("[VITE-BYPASS] Complete Vite client bypass installed successfully");
})();