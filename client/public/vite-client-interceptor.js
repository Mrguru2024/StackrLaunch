/**
 * VITE CLIENT INTERCEPTOR
 * 
 * This script intercepts requests to the Vite client and replaces them with our fixed version
 * that doesn't use import.meta to avoid errors.
 */

(function() {
  console.log("[INTERCEPTOR] Setting up Vite client interceptor");
  
  // Store original fetch function
  const originalFetch = window.fetch;
  
  // Override fetch to intercept Vite client requests
  window.fetch = function(resource, init) {
    if (resource && typeof resource === 'string' && resource.includes('/@vite/client')) {
      console.log("[INTERCEPTOR] Intercepting Vite client request:", resource);
      
      // Return our fixed version instead
      return originalFetch('/fixed-vite-client.js', init);
    }
    
    // Pass through all other fetch requests
    return originalFetch.apply(this, arguments);
  };
  
  // Create global object for Vite to use
  window.__vite_hmr = {
    createHotContext: function() {
      return {
        accept: function() {},
        prune: function() {},
        dispose: function() {},
        decline: function() {},
        invalidate: function() {},
        on: function() {}
      };
    }
  };
  
  console.log("[INTERCEPTOR] Vite client interceptor installed successfully");
})();