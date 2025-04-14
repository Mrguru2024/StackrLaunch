/**
 * Very simple error suppression for Vite WebSocket errors
 * This doesn't use import.meta at all and should be safe in any context
 */
(function() {
  console.log("Loading simple error suppression for WebSocket connections");
  
  // Suppress WebSocket errors in console
  const originalConsoleError = console.error;
  console.error = function() {
    // Convert arguments to array to make it easier to work with
    const args = Array.from(arguments);
    
    // Check if the error contains WebSocket-related text
    if (args.some(arg => 
      typeof arg === 'string' && 
      (arg.includes('WebSocket') || 
       arg.includes('ws://') || 
       arg.includes('wss://'))
    )) {
      // Filter out the error
      return;
    }
    
    // Pass through all other errors
    return originalConsoleError.apply(this, args);
  };
  
  // Suppress unhandled rejection errors for WebSockets
  window.addEventListener('unhandledrejection', function(event) {
    if (event && event.reason && 
        ((typeof event.reason.message === 'string' && 
          event.reason.message.includes('WebSocket')) || 
         (typeof event.reason.stack === 'string' && 
          event.reason.stack.includes('WebSocket')))) {
      // Prevent the error from propagating
      event.preventDefault();
      return false;
    }
  });
  
  // Hide any error overlays that might appear
  const style = document.createElement('style');
  style.textContent = `
    .hmr-error-overlay,
    .vite-error-overlay,
    .__vite-error-overlay,
    [id^='vite-error-overlay'],
    [class^='vite-error-overlay'] {
      display: none !important;
    }
  `;
  document.head.appendChild(style);
  
  console.log("Simple error suppression loaded");
})();