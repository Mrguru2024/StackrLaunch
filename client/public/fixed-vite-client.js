// Fixed Vite Client for Production Use
// This is a stub version that removes all import.meta usage

// Create a global object to store HMR state
window.__vite_hmr = {
  createHotContext: function(ownerPath) {
    return {
      accept: function(deps, callback) {
        // No-op in production
        return undefined;
      },
      acceptDeps: function(deps, callback) {
        // No-op in production
        return undefined;
      }, 
      dispose: function(callback) {
        // No-op in production
        return undefined;
      },
      prune: function(callback) {
        // No-op in production
        return undefined;
      },
      decline: function() {
        // No-op in production
        return undefined;
      },
      invalidate: function(message) {
        // No-op in production
        return undefined;
      },
      on: function(event, callback) {
        // No-op in production
        return undefined;
      }
    };
  }
};

// Export required functions used by Vite
export function createHotContext(ownerPath) {
  return window.__vite_hmr.createHotContext(ownerPath);
}

// Empty WebSocket client stub
export const webSocketClient = {
  send: () => {},
  onMessage: () => {},
  close: () => {},
  connect: () => {},
  waitForConnection: () => Promise.resolve()
};

// Empty style functions
export function updateStyle() {}
export function removeStyle() {}

// Empty fetch update
export function fetchUpdate() {
  return Promise.resolve();
}

// Empty error overlay
export const ErrorOverlay = {
  hasErrorOverlay: () => false,
  clearErrorOverlay: () => {},
  processError: () => {}
};

// Expose as default
export default {
  createHotContext,
  webSocketClient,
  updateStyle,
  removeStyle,
  fetchUpdate,
  ErrorOverlay
};