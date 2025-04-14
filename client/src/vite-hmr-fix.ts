/**
 * REPLIT VITE HMR PORT FIX
 * 
 * This script solves the 'wss://localhost:undefined/?token=...' error in Replit
 * by patching WebSocket to use the correct port (443) for Vite HMR websocket connections.
 */
if (typeof window !== "undefined") {
  console.log("[HMR-FIX] Starting ClientPort patch for Vite HMR...");
  
  try {
    // Store current hostname (your repl domain)
    const hostname = window.location.hostname;
    
    // Override window.__HMR_PROTOCOL and window.__HMR_HOSTNAME if they exist
    Object.defineProperty(window, '__HMR_PROTOCOL', { 
      value: 'wss',
      writable: false,
      configurable: true 
    });
    
    Object.defineProperty(window, '__HMR_HOSTNAME', { 
      value: hostname,
      writable: false,
      configurable: true 
    });
    
    // Force the correct port for all WebSocket connections
    Object.defineProperty(window, '__HMR_PORT', { 
      value: 443,
      writable: false,
      configurable: true 
    });
    
    // Store original WebSocket constructor
    const OriginalWebSocket = window.WebSocket;
    
    // Create new WebSocket constructor that fixes port issues (using ES5-compatible syntax)
    const FixedWebSocket = function(url: string | URL, protocols?: string | string[]) {
      if (url && typeof url === 'string') {
        // Check if it's a localhost URL with undefined port
        if (url.includes('localhost:undefined') || url.match(/wss?:\/\/localhost:undefined/)) {
          // Parse the original URL to extract the token and other components
          let fixedUrl = url;
          try {
            const originalUrl = new URL(url);
            const token = originalUrl.searchParams.get('token');
            
            // Create a properly formed URL with the current hostname and secure port
            fixedUrl = `wss://${hostname}:443/${token ? `?token=${token}` : ''}`;
            console.log(`[HMR-FIX] Replacing invalid WS URL: ${url} with: ${fixedUrl}`);
          } catch (e) {
            console.log(`[HMR-FIX] Could not parse URL: ${url}, using host-only fix`);
            fixedUrl = `wss://${hostname}:443/`;
          }
          
          // Create a new WebSocket with the fixed URL
          return new OriginalWebSocket(fixedUrl, protocols);
        }
      }
      
      // Any other URLs pass through unchanged
      return new OriginalWebSocket(url, protocols);
    };
    
    // Make it look like a proper WebSocket constructor
    FixedWebSocket.prototype = OriginalWebSocket.prototype;
    
    // Copy over the static properties (CONNECTING, OPEN, etc.)
    Object.defineProperties(FixedWebSocket, {
      CONNECTING: { value: OriginalWebSocket.CONNECTING },
      OPEN: { value: OriginalWebSocket.OPEN },
      CLOSING: { value: OriginalWebSocket.CLOSING },
      CLOSED: { value: OriginalWebSocket.CLOSED }
    });
    
    // Replace the global WebSocket constructor with our fixed version
    window.WebSocket = FixedWebSocket as any;
    
    // Hook into unhandled promise rejections to prevent WebSocket errors from appearing
    window.addEventListener('unhandledrejection', function(event) {
      if (event && event.reason && 
          ((event.reason.message && typeof event.reason.message === 'string' && 
            event.reason.message.includes('WebSocket')) || 
           (event.reason.stack && typeof event.reason.stack === 'string' && 
            event.reason.stack.includes('WebSocket')))) {
        // Suppress WebSocket-related errors
        console.log('[HMR-FIX] Suppressed WebSocket rejection:', 
            event.reason.message || 'Unknown WebSocket error');
        event.preventDefault();
      }
    });
    
    console.log("[HMR-FIX] Successfully installed WebSocket port fix for Replit!");
  } catch (error) {
    console.error("[HMR-FIX] Error setting up WebSocket fix:", error);
  }
}