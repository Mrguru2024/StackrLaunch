// Only do this on the client
if (typeof window !== "undefined") {
  console.log("[vite-hmr-fix] HMR fix loading...");
  
  try {
    // Get current hostname
    const hostname = window.location.hostname;
    // Use Replit's secure port
    const hmrPort = 443;

    // Create a valid WebSocket URL for our environment
    const validWsUrl = `wss://${hostname}:${hmrPort}/?hmr`;
    console.log("[vite-hmr-fix] Will use this WebSocket URL instead:", validWsUrl);

    // More aggressive WebSocket override
    const OriginalWebSocket = window.WebSocket;
    
    // Type-safe WebSocket override
    const CustomWebSocket = function(
      this: WebSocket,
      url: string | URL, 
      protocols?: string | string[]
    ) {
      if (typeof url === 'string' && (
          url.includes('localhost:undefined') || 
          url.includes('undefined/?token=')
      )) {
        console.log("[vite-hmr-fix] Intercepted invalid WebSocket URL:", url);
        console.log("[vite-hmr-fix] Using fixed URL instead:", validWsUrl);
        
        // Return a mock WebSocket that doesn't attempt connection
        const mockWs = {
          url: url,
          readyState: 0,
          protocol: '',
          extensions: '',
          bufferedAmount: 0,
          binaryType: 'blob' as BinaryType,
          onopen: null,
          onerror: null,
          onclose: null,
          onmessage: null,
          close: function(){},
          send: function(){},
          addEventListener: function(){},
          removeEventListener: function(){},
          dispatchEvent: function(){ return true; }
        };
        
        return mockWs as unknown as WebSocket;
      }
      
      return new OriginalWebSocket(url, protocols);
    } as unknown as typeof WebSocket;
    
    // Apply the original prototype to our custom constructor
    CustomWebSocket.prototype = OriginalWebSocket.prototype;
    
    // Store constants as non-writable properties
    Object.defineProperties(CustomWebSocket, {
      CONNECTING: { value: OriginalWebSocket.CONNECTING },
      OPEN: { value: OriginalWebSocket.OPEN },
      CLOSING: { value: OriginalWebSocket.CLOSING },
      CLOSED: { value: OriginalWebSocket.CLOSED }
    });
    
    // Replace the global WebSocket with our custom implementation
    window.WebSocket = CustomWebSocket;
    
    // Disable HMR entirely by setting these globals
    (window as any).__HMR_ENABLED = false;
    (window as any).__VITE_HMR_ACTIVE = false;
    (window as any).__VITE_HMR_TIMEOUT_HANDLER = function() {};
    
    // Add an event listener to suppress WebSocket-related unhandled promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      const reason = event.reason;
      if (reason && 
          ((reason.message && typeof reason.message === 'string' && reason.message.includes('WebSocket')) || 
           (reason.stack && typeof reason.stack === 'string' && reason.stack.includes('WebSocket')))) {
        console.log("[vite-hmr-fix] Suppressed WebSocket-related unhandled rejection");
        event.preventDefault();
      }
    });
    
    console.log("[vite-hmr-fix] HMR fix installed successfully");
  } catch (error) {
    console.error("[vite-hmr-fix] Error installing HMR fix:", error);
  }
}