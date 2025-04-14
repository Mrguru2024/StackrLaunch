/**
 * REPLIT VITE HMR PORT FIX
 * 
 * This script solves the 'wss://localhost:undefined/?token=...' error in Replit
 * by patching WebSocket to use the correct port (443) for Vite HMR websocket connections.
 */

// Empty export to ensure this is treated as a module
export const hmrFixer = {
  enable: function() {
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
        
        console.log("[HMR-FIX] Successfully installed WebSocket port fix for Replit!");
      } catch (error) {
        console.error("[HMR-FIX] Error setting up WebSocket fix:", error);
      }
    }
  }
};

// Don't do anything by default
// This file only exports the fixer object