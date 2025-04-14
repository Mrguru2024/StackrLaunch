/**
 * COMPLETE VITE CLIENT REPLACER
 * 
 * This script actually creates and injects a replacement @vite/client module
 * into the DOM before Vite can load it naturally. Since module loading respects
 * the first module that is registered, this effectively blocks the real client.
 */

(function() {
  console.log("[VITE-REPLACE] Starting Vite client replacement...");
  
  // Create the replacement module
  const scriptContent = `
    // Empty stub implementation of @vite/client
    export const webSocketClient = {
      send: () => {},
      onmessage: () => {},
      close: () => {},
      connect: () => {}
    };
    
    export const devtoolsClient = {
      enabled: false,
      connected: false
    };
    
    export function createHotContext() {
      return {
        accept: () => {},
        dispose: () => {},
        decline: () => {},
        invalidate: () => {},
        on: () => {}
      };
    }
    
    export const ErrorOverlay = {
      customEmit: () => {},
      send: () => {}
    };
    
    export function updateStyle() {}
    export function removeStyle() {}
    export function fetchUpdate() { return Promise.resolve(); }
    export function setupWebSocket() {}
    export function enableOverlay() {}
    export function decode() {}
    export function transformCode() {}
    
    console.log("[VITE-REPLACE] Using fake Vite client module");
  `;
  
  // Create the script element for @vite/client
  const clientScript = document.createElement('script');
  clientScript.setAttribute('type', 'module');
  clientScript.setAttribute('id', 'vite-client-stub');
  
  // This crucial attribute makes this module available as @vite/client
  // The slash at the end is important to match Vite's exact module path
  clientScript.setAttribute('data-src', '/@vite/client/');
  
  // Set the content 
  clientScript.textContent = scriptContent;
  
  // Insert it at the very beginning of head
  document.head.insertBefore(clientScript, document.head.firstChild);
  
  // Another approach: block the module entirely via native browser APIs
  if (window.trustedTypes && window.trustedTypes.createPolicy) {
    try {
      // Create a policy to sanitize script URLs
      const policy = window.trustedTypes.createPolicy('vite-blocker', {
        createScriptURL: (url) => {
          if (url.includes('/@vite/client') || url.includes('@vite/client')) {
            console.log('[VITE-REPLACE] Blocked script URL:', url);
            // Return a benign URL
            return 'data:text/javascript,export default {}; export const createHotContext = () => ({});';
          }
          return url;
        }
      });
      
      // Store the original fetch implementation
      const originalFetch = window.fetch;
      
      // Override fetch to intercept requests for Vite's client
      window.fetch = function(input, init) {
        if (typeof input === 'string' && input.includes('/@vite/client')) {
          console.log('[VITE-REPLACE] Intercepted fetch for:', input);
          
          // Return an empty module
          return Promise.resolve(new Response(scriptContent, {
            status: 200,
            headers: { 'Content-Type': 'application/javascript' }
          }));
        }
        
        // Pass through all other fetches
        return originalFetch.apply(this, arguments);
      };
      
      console.log('[VITE-REPLACE] Installed URL sanitizing policy');
    } catch (e) {
      console.error('[VITE-REPLACE] Error creating policy:', e);
    }
  }
  
  // Completely prevent any WebSocket connections
  const OriginalWebSocket = window.WebSocket;
  window.WebSocket = function(url, protocols) {
    if (typeof url === 'string' && (
        url.includes('/@vite/') || 
        url.includes('localhost:undefined') || 
        url.includes('/__vite_hmr')
    )) {
      console.log('[VITE-REPLACE] Blocked WebSocket connection to:', url);
      
      // Return a fake WebSocket that does nothing
      return {
        url: url,
        readyState: 3, // CLOSED
        protocol: '',
        extensions: '',
        bufferedAmount: 0,
        binaryType: 'blob',
        onopen: null,
        onerror: null,
        onclose: null,
        onmessage: null,
        close: function() {},
        send: function() {},
        addEventListener: function() {},
        removeEventListener: function() {},
        dispatchEvent: function() { return true; }
      };
    }
    
    // For any other WebSocket connections, proceed normally
    return new OriginalWebSocket(url, protocols);
  };
  
  // Copy over static properties
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  window.WebSocket.CONNECTING = OriginalWebSocket.CONNECTING;
  window.WebSocket.OPEN = OriginalWebSocket.OPEN;
  window.WebSocket.CLOSING = OriginalWebSocket.CLOSING;
  window.WebSocket.CLOSED = OriginalWebSocket.CLOSED;
  
  // Filter out logs
  const originalConsoleLog = console.log;
  console.log = function(...args) {
    if (args.length > 0 && 
        typeof args[0] === 'string' && 
        args[0].includes('[vite]')) {
      // Silently drop Vite logs
      return;
    }
    return originalConsoleLog.apply(this, args);
  };
  
  console.log('[VITE-REPLACE] Vite client replacement complete');
})();