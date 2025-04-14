// Vite Polyfill - Provides compatibility for Vite HMR features without reliance on import.meta

// Create global window.__vite_hmr object for accepting HMR updates
window.__vite_hmr = {
  accept: function() {
    console.debug("[vite-polyfill] HMR accept called");
    return window.__vite_hmr;
  },
  dispose: function() {
    console.debug("[vite-polyfill] HMR dispose called");
    return window.__vite_hmr;
  },
  prune: function() {
    console.debug("[vite-polyfill] HMR prune called");
    return window.__vite_hmr;
  },
  decline: function() {
    console.debug("[vite-polyfill] HMR decline called");
    return window.__vite_hmr;
  },
  invalidate: function() {
    console.debug("[vite-polyfill] HMR invalidate called");
    return window.__vite_hmr;
  },
  on: function() {
    console.debug("[vite-polyfill] HMR on called");
    return window.__vite_hmr;
  }
};

// Create a no-op WebSocket client 
window.__vite_ws = {
  send: function() {
    console.debug("[vite-polyfill] WebSocket send called");
  },
  close: function() {
    console.debug("[vite-polyfill] WebSocket close called");
  },
  addEventListener: function() {
    console.debug("[vite-polyfill] WebSocket addEventListener called");
  }
};

// Export all Vite client functions that might be used by the application
// This avoids "cannot find X in @vite/client" errors
window.__vite_client = {
  createHotContext: function() {
    console.debug("[vite-polyfill] createHotContext called");
    return window.__vite_hmr;
  },
  updateStyle: function() {
    console.debug("[vite-polyfill] updateStyle called");
  },
  removeStyle: function() {
    console.debug("[vite-polyfill] removeStyle called");
  },
  fetchUpdate: function() {
    console.debug("[vite-polyfill] fetchUpdate called");
    return Promise.resolve();
  }
};

// Mock Error Overlay functions
window.__vite_error_overlay = {
  hasErrorOverlay: function() { return false; },
  clearErrorOverlay: function() {},
  processError: function() {}
};

// Install as global
window.__vitePolyfillInstalled = true;
console.log("[vite-polyfill] Installed successfully");