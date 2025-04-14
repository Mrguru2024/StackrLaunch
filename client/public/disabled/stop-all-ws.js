/**
 * NUCLEAR OPTION: STOP ALL WEBSOCKET CONNECTIONS
 * 
 * This script completely prevents the browser from even attempting
 * WebSocket connections by replacing the WebSocket constructor with
 * a version that returns dummy objects that do nothing.
 */

(function() {
  console.log('[STOP-WS] Preventing ALL WebSocket connections...');
  
  // Save original constructor for non-Vite connections
  const OriginalWebSocket = window.WebSocket;
  
  // Replace WebSocket constructor with a fake one
  window.WebSocket = function(url, protocols) {
    // Show what's being blocked in the console
    console.log('[STOP-WS] Blocking WebSocket connection to:', url);
    
    // Return a completely non-functional WebSocket-like object
    const fakeSocket = {
      url: url,
      protocol: '',
      readyState: 3, // CLOSED
      extensions: '',
      bufferedAmount: 0,
      binaryType: 'blob',
      
      // Events
      onopen: null,
      onmessage: null,
      onclose: null,
      onerror: null,
      
      // Methods
      close: function() {},
      send: function() {},
      addEventListener: function() {},
      removeEventListener: function() {},
      dispatchEvent: function() { return true; }
    };
    
    // Immediately trigger error to satisfy Vite
    setTimeout(function() {
      if (typeof fakeSocket.onerror === 'function') {
        fakeSocket.onerror(new Error('WebSocket connection blocked by stop-all-ws.js'));
      }
    }, 50);
    
    return fakeSocket;
  };
  
  // Copy static properties
  window.WebSocket.CONNECTING = 0;
  window.WebSocket.OPEN = 1;
  window.WebSocket.CLOSING = 2;
  window.WebSocket.CLOSED = 3;
  
  // Handle any unhandled promise rejections
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && 
        ((event.reason.message && event.reason.message.includes('WebSocket')) ||
         (event.reason.stack && event.reason.stack.includes('WebSocket')))) {
      console.log('[STOP-WS] Suppressed WebSocket error event');
      event.preventDefault();
      event.stopPropagation();
    }
  }, true);
  
  // Replace any attempts to reconnect
  window.__VITE_HMR_RECONNECT = function() {
    console.log('[STOP-WS] Blocked Vite HMR reconnect attempt');
    return false;
  };
  
  // Turn off HMR permanently
  window.__VITE_HMR_ACTIVE = false;
  window.__HMR_ENABLED = false;
  
  console.log('[STOP-WS] Successfully blocked all WebSocket connections');
})();