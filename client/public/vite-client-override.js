// This script completely overrides Vite's client code to prevent WebSocket errors
console.log('[Vite-Override] Replacing Vite client functionality');

// Create mock objects for all Vite client functionality
window.__vite_hmr__ = {
  on: (event, cb) => {},
  off: (event, cb) => {},
  send: (event, data) => {},
  dispose: () => {},
  data: {}
};

// Prevent Vite from trying to establish WebSocket connection
window.__vite_ws_disabled__ = true;
window.__vite_hmr_disabled__ = true;
window.__VITE_HMR_DISABLE__ = true;

// Mock the hot API
window.hot = {
  accept: () => {},
  dispose: () => {},
  invalidate: () => {},
  decline: () => {},
  on: () => {},
  prune: () => {}
};

// Create fake module record system
window.__vite_plugin_react_timeout__ = null;
window.__vite_plugin_react_preamble_installed__ = true;

// Override any attempted WebSocket creation
const originalWebSocketConstructor = window.WebSocket;
window.WebSocket = function(url, protocols) {
  if (url && (url.includes('localhost:undefined') || url.includes('token='))) {
    console.log('[Vite-Override] Prevented WebSocket connection to:', url);
    return {
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => {},
      send: () => {},
      close: () => {},
      binaryType: 'blob',
      bufferedAmount: 0,
      extensions: '',
      onclose: null,
      onerror: null,
      onmessage: null,
      onopen: null,
      protocol: '',
      readyState: 3, // WebSocket.CLOSED
      url: '',
      CONNECTING: 0,
      OPEN: 1,
      CLOSING: 2, 
      CLOSED: 3
    };
  }
  return new originalWebSocketConstructor(url, protocols);
};

// Create fake Vite client functions
window.__vite_import__ = function() {
  return Promise.resolve(null);
};

// Create a custom console.error to filter out WebSocket errors
const originalConsoleError = console.error;
console.error = function(...args) {
  const errorString = args.join(' ');
  if (
    errorString.includes('WebSocket') || 
    errorString.includes('localhost:undefined') ||
    errorString.includes('Vite') ||
    errorString.includes('HMR')
  ) {
    console.log('[Error Suppressed] WebSocket/Vite related error');
    return;
  }
  originalConsoleError.apply(console, args);
};

// Suppress any unhandled promise rejections related to WebSockets
window.addEventListener('unhandledrejection', function(event) {
  if (
    event.reason?.message?.includes('WebSocket') ||
    event.reason?.message?.includes('localhost:undefined') ||
    event.reason?.message?.includes('Vite') ||
    event.reason?.message?.includes('HMR')
  ) {
    event.preventDefault();
    console.log('[Error Suppressed] Prevented WebSocket error from appearing in console');
    return false;
  }
}, true);

// Hijack window.onerror to prevent WebSocket errors
window.addEventListener('error', function(event) {
  if (event.message && (
    event.message.includes('WebSocket') ||
    event.message.includes('localhost:undefined') ||
    event.message.includes('Vite') ||
    event.message.includes('HMR')
  )) {
    event.preventDefault();
    console.log('[Error Suppressed] Prevented WebSocket error event from bubbling up');
    return false;
  }
}, true);

console.log('[Vite-Override] All Vite client functionality successfully overridden');