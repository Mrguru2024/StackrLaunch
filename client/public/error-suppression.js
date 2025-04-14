/**
 * Error Suppression Script
 * 
 * This script captures and suppresses specific errors in the console
 * without affecting the application's functionality.
 */

(function() {
  // Capture console.error to filter out WebSocket error messages
  const originalConsoleError = console.error;
  console.error = function(...args) {
    // Filter out WebSocket-related errors
    if (args.length > 0 && 
        (typeof args[0] === 'string' && 
         (args[0].includes('WebSocket') || 
          args[0].includes('Failed to construct') || 
          args[0].includes('wss://localhost:undefined')))) {
      // Silently ignore WebSocket errors
      return;
    }
    
    // Forward all other errors to the original console.error
    return originalConsoleError.apply(console, args);
  };
  
  // Capture unhandled promise rejections related to WebSocket connections
  window.addEventListener('unhandledrejection', function(event) {
    if (event.reason && 
        (event.reason.message && 
         (event.reason.message.includes('WebSocket') || 
          event.reason.message.includes('Failed to construct') || 
          event.reason.message.includes('wss://localhost:undefined')))) {
      // Prevent the default browser handling of the error
      event.preventDefault();
      event.stopPropagation();
      return false;
    }
  }, true);
  
  // Capture and prevent Vite HMR connections
  window.__VITE_HMR_ACTIVE = false;
  window.__VITE_IS_MODERN_BROWSER = false;
  window.__HMR_ENABLED = false;
  
  console.log('[Error Suppression] Successfully installed error filters');
})();