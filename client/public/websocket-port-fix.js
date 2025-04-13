/**
 * WebSocket Port Fix for Replit Environment
 * 
 * This script runs before Vite and patches the WebSocket constructor
 * to ensure it always uses the correct port when Vite tries to connect.
 * 
 * IMPORTANT: This script must load before any Vite scripts.
 */

(function() {
  console.log('[WebSocket Fix] Script loaded, initializing...');
  
  // Store the original WebSocket constructor
  const OriginalWebSocket = window.WebSocket;
  
  // Create a patched WebSocket class
  class PatchedWebSocket extends OriginalWebSocket {
    constructor(url, protocols) {
      try {
        // Log the original URL being attempted
        console.log('[WebSocket Fix] Connection attempt to:', url);
        
        // Check if this is a Vite HMR WebSocket connection or has an undefined port
        if (url && (url.includes('localhost:undefined') || url.includes('undefined/?token='))) {
          // We'll try different port variations to ensure one works
          let fixedUrl = url;
          
          // Fix common patterns
          fixedUrl = fixedUrl.replace('localhost:undefined', 'localhost:5000');
          fixedUrl = fixedUrl.replace('wss://localhost:undefined', 'wss://localhost:5000');
          fixedUrl = fixedUrl.replace('ws://localhost:undefined', 'ws://localhost:5000');
          
          // Handle the case of just 'undefined' in the URL
          fixedUrl = fixedUrl.replace(':undefined/', ':5000/');
          
          // Also try with the current window location host
          if (fixedUrl.includes('undefined')) {
            const host = window.location.host;
            fixedUrl = fixedUrl.replace(/localhost:undefined/g, host);
          }
          
          console.log('[WebSocket Fix] Patched URL to:', fixedUrl);
          
          // Call the original constructor with the fixed URL
          super(fixedUrl, protocols);
        } else {
          // For all other WebSocket connections, use the original URL
          super(url, protocols);
        }
      } catch (error) {
        console.error('[WebSocket Fix] Error in WebSocket patching:', error);
        // Fall back to original behavior if our patch fails
        super(url, protocols);
      }
    }
  }
  
  // Replace the global WebSocket with our patched version
  try {
    window.WebSocket = PatchedWebSocket;
    console.log('[WebSocket Fix] Successfully patched WebSocket constructor');
    
    // Completely disable Vite HMR
    window.__disableHMR = true;
    window.__HMR_PORT = 5000;
    window.__HMR_HOST = window.location.hostname;
    
    // Send message to service worker if it's active
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({
        type: 'WS_FIX_INITIALIZED'
      });
    }
    
    // Listen for messages from the service worker
    navigator.serviceWorker.addEventListener('message', (event) => {
      if (event.data && event.data.type === 'WS_FIX_READY') {
        console.log('[WebSocket Fix] Service worker is ready');
      }
    });
  } catch (error) {
    console.error('[WebSocket Fix] Failed to patch WebSocket:', error);
  }
  
  // Register service worker
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/websocket-service-worker.js')
        .then(registration => {
          console.log('[WebSocket Fix] Service worker registered:', registration.scope);
        })
        .catch(error => {
          console.error('[WebSocket Fix] Service worker registration failed:', error);
        });
    });
  } else {
    console.warn('[WebSocket Fix] Service workers not supported in this browser');
  }
  
  // Completely disable Vite HMR by intercepting any attempts to load the client
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && (value.includes('/@vite/client') || value.includes('/@fs/@vite/client'))) {
          console.log('[WebSocket Fix] Blocked Vite client script:', value);
          return element;
        }
        return originalSetAttribute.call(element, name, value);
      };
    }
    return element;
  };
  
  console.log('[WebSocket Fix] Initialization complete');
})();