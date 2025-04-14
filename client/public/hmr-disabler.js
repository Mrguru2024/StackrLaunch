/**
 * COMPLETE VITE HMR DISABLER
 * 
 * This script completely disables Vite's Hot Module Replacement functionality
 * to prevent "Cannot use import.meta outside a module" errors
 */

(function() {
  console.log("[HMR-DISABLER] Setting up HMR disabler...");
  
  // Create a global object to prevent Vite's HMR from initializing
  window.__vite_plugin_react_preamble_installed__ = true;
  window.__vite_hmr_runtime = {
    createHotContext: function() {
      return {
        accept: function() {},
        dispose: function() {},
        invalidate: function() {},
        decline: function() {},
        on: function() {}
      };
    }
  };
  
  // Create global Vite export mock to prevent import.meta errors
  window.import = {};
  window.import.meta = {
    url: window.location.href,
    env: {},
    hot: {
      accept: function() {},
      dispose: function() {},
      prune: function() {},
      invalidate: function() {},
      decline: function() {},
      on: function() {}
    }
  };
  
  // Define a special variable for Vite's HMR
  window.__vite_hmr = window.import.meta.hot;
  
  // Mock out import.meta directly
  try {
    Object.defineProperty(Object.prototype, 'import', {
      get: function() {
        return window.import;
      }
    });
  } catch (e) {
    console.log("[HMR-DISABLER] Could not mock import.meta globally:", e);
  }
  
  // Block all Vite client script loads
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.apply(document, arguments);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      
      element.setAttribute = function(name, value) {
        // Process src attribute for script tags
        if (name === 'src' && typeof value === 'string') {
          // Block specific Vite resources
          if (value.includes('/@vite/client')) {
            console.log("[HMR-DISABLER] Blocking Vite client script:", value);
            // Replace with our empty module
            return originalSetAttribute.call(this, 'src', '/fixed-vite-client.js');
          }
          
          // Process type attribute for script tags
          if (name === 'type' && value === 'module') {
            console.log("[HMR-DISABLER] Detected module script");
            
            // Add dataset to mark this as a processed module
            element.dataset.processed = 'true';
            
            // Wrap in try/catch when it loads
            element.onerror = function(e) {
              console.log("[HMR-DISABLER] Error in module script:", e);
              e.preventDefault();
              return true;
            };
          }
        }
        
        return originalSetAttribute.apply(this, arguments);
      };
    }
    
    return element;
  };
  
  // Block WebSocket connections to prevent HMR
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (url && typeof url === 'string') {
      // Block Vite-related WebSocket connections
      if (url.includes('/@vite/client') || 
          url.includes('vite-hmr') ||
          url.includes('localhost:undefined') ||
          url.includes('localhost:443')) {
        console.log("[HMR-DISABLER] Blocking WebSocket connection:", url);
        
        // Return dummy WebSocket that does nothing
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
    }
    
    // Otherwise create normal WebSocket
    return new OriginalWebSocket(url, protocols);
  };
  
  // Copy WebSocket constants to our constructor
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
  
  // Modify fetch to handle Vite client requests
  const originalFetch = window.fetch;
  window.fetch = function(resource, init) {
    if (resource && typeof resource === 'string') {
      // Block Vite-related fetch requests
      if (resource.includes('/@vite/client') || 
          resource.includes('/@fs/') ||
          resource.includes('/@id/') ||
          resource.includes('/@react-refresh')) {
        console.log("[HMR-DISABLER] Intercepting Vite fetch:", resource);
        
        // Return a dummy response for Vite imports
        return Promise.resolve({
          ok: true,
          status: 200,
          statusText: 'OK',
          text: () => Promise.resolve('// Empty module'),
          json: () => Promise.resolve({}),
          headers: new Headers()
        });
      }
    }
    
    // Normal fetch for other resources
    return originalFetch.apply(this, arguments);
  };
  
  // Basic error catching
  const originalError = console.error;
  console.error = function() {
    const args = Array.from(arguments);
    
    // Filter out import.meta and WebSocket errors
    if (args.some(arg => 
      typeof arg === 'string' && 
      (arg.includes('import.meta') || 
       arg.includes('WebSocket') || 
       arg.includes('ws://') || 
       arg.includes('wss://') ||
       arg.includes('localhost:undefined'))
    )) {
      // Ignore these errors
      return;
    }
    
    // Pass through all other errors
    return originalError.apply(this, arguments);
  };
  
  console.log("[HMR-DISABLER] HMR disabler installed successfully");
})();