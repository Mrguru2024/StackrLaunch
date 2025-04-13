// This file properly fixes Vite's Hot Module Replacement (HMR) WebSocket connection in Replit
// It corrects the invalid WebSocket URL by providing the correct port (5000)

// Execute immediately
(function() {
  console.log('[Vite HMR Fix] Initializing WebSocket connection fix');
  
  // Store original WebSocket constructor to use for valid connections
  const OriginalWebSocket = window.WebSocket;
  
  // Override the WebSocket constructor to fix HMR connections
  window.WebSocket = function(url, protocols) {
    // Only modify Vite HMR WebSocket connections with invalid URLs
    if (url && typeof url === 'string' && url.includes('localhost:undefined') && url.includes('token=')) {
      // Extract the HMR token from the URL
      const tokenMatch = url.match(/token=([^&]+)/);
      const token = tokenMatch ? tokenMatch[1] : '';
      
      // Create a corrected WebSocket URL with the proper port
      let wsProtocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
      let wsHost = window.location.hostname;
      
      // Use the known Express server port (5000)
      let correctedUrl = `${wsProtocol}//${wsHost}:5000/?token=${token}`;
      
      console.log('[Vite HMR Fix] Fixed WebSocket URL:', correctedUrl);
      return new OriginalWebSocket(correctedUrl, protocols);
    }
    
    // For all other WebSocket connections, proceed normally
    return new OriginalWebSocket(url, protocols);
  };
  
  // Preserve all properties and methods from the original WebSocket constructor
  for (let prop in OriginalWebSocket) {
    if (OriginalWebSocket.hasOwnProperty(prop)) {
      window.WebSocket[prop] = OriginalWebSocket[prop];
    }
  }
  
  // Make sure the prototype chain is maintained
  window.WebSocket.prototype = OriginalWebSocket.prototype;
  
  console.log('[Vite HMR Fix] WebSocket constructor patched successfully');
})();