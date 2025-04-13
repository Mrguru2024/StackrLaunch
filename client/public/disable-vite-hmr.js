/**
 * Complete Vite HMR Disabler - Loads before any other scripts
 * This aggressively prevents WebSocket connections by removing Vite's capability
 * to load its HMR client
 */

(function() {
  console.log('[VITE-DISABLE] Aggressively disabling Vite HMR...');
  
  // 1. Set global flags that Vite checks
  window.__VITE_IS_MODERN__ = false;
  window.__VITE_HMR_TIMEOUT_FIRED__ = true;
  window.__VITE_HMR_TIMEOUT__ = 0;
  window.__VITE_HMR_ENABLE__ = false;
  window.__HMR_ENABLE__ = false;
  window.__HMR_PORT__ = undefined;
  window.__HMR_TIMEOUT__ = undefined;
  window.__HMR_PROTOCOL__ = null;
  window.__HMR_HOSTNAME__ = null;
  window.__HMR_BASE_PATH__ = null;
  window.__HMR_TIMEOUT_FIRED__ = true;
  window.__HMR_ALREADY_CALLED__ = true;
  
  // 2. Prevent dynamic imports of the HMR client
  const origCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = origCreateElement.apply(document, arguments);
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && 
            (value.includes('@vite/client') || 
             value.includes('/@vite/client') || 
             value.includes('vite/dist/client'))) {
          console.log('[VITE-DISABLE] Blocked script:', value);
          return;
        }
        return originalSetAttribute.call(this, name, value);
      };
    }
    return element;
  };
  
  // 3. Completely replace WebSocket to prevent any connections with invalid ports
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (typeof url === 'string' && 
        (url.includes('localhost:undefined') || 
         url.includes('/@vite/client') ||
         url.includes('vite-hmr'))) {
      console.log('[VITE-DISABLE] Blocked WebSocket connection:', url);
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
    
    // Allow legitimate WebSocket connections to proceed
    try {
      return new OriginalWebSocket(url, protocols);
    } catch (err) {
      console.log('[VITE-DISABLE] WebSocket error intercepted:', err.message);
      // Return a mock WebSocket to prevent errors
      return {
        addEventListener: function() {},
        removeEventListener: function() {},
        send: function() {},
        close: function() {},
        readyState: 3,
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
  
  // Preserve WebSocket properties
  Object.defineProperties(window.WebSocket, {
    CONNECTING: { value: 0 },
    OPEN: { value: 1 },
    CLOSING: { value: 2 },
    CLOSED: { value: 3 },
    prototype: { value: OriginalWebSocket.prototype }
  });
  
  // 4. Stop any WebSocket errors from bubbling up
  window.addEventListener('error', function(event) {
    if (event && event.message && event.message.includes('WebSocket')) {
      console.log('[VITE-DISABLE] Caught WebSocket error:', event.message);
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  window.addEventListener('unhandledrejection', function(event) {
    if (event && event.reason && event.reason.message && 
        event.reason.message.includes('WebSocket')) {
      console.log('[VITE-DISABLE] Caught unhandled WebSocket promise rejection:', event.reason.message);
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // 5. Override any global functions that Vite's HMR client might use
  window.setupWebSocket = function() { 
    console.log('[VITE-DISABLE] Blocked setupWebSocket call');
    return { send: function() {}, close: function() {} };
  };
  window.createHotContext = function() {
    console.log('[VITE-DISABLE] Blocked createHotContext call');
    return { 
      accept: function() {}, 
      prune: function() {}, 
      dispose: function() {},
      decline: function() {},
      invalidate: function() {},
      on: function() {}
    };
  };
  
  // 6. Block Vite's dynamic module loading mechanism
  const origFetch = window.fetch;
  window.fetch = function(resource, init) {
    if (resource && typeof resource === 'string' && 
        (resource.includes('/@vite/client') || 
         resource.includes('/@fs/') ||
         resource.includes('/@id/') ||
         resource.includes('vite-hmr'))) {
      console.log('[VITE-DISABLE] Blocked fetch:', resource);
      return Promise.resolve(
        new Response('', {
          status: 200,
          headers: { 'Content-Type': 'application/javascript' }
        })
      );
    }
    return origFetch.apply(this, arguments);
  };
  
  console.log('[VITE-DISABLE] Vite HMR completely disabled');
})();