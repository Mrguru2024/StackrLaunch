// Mock Vite client for production/non-HMR environments
// This prevents import.meta errors when loading the Vite client

// Access the polyfill if available
const vitePolyfill = window.__vite_client || {};

// Export Vite HMR functions
export function createHotContext() {
  console.log("[@vite/client] createHotContext called");
  return {
    accept: () => {},
    dispose: () => {},
    prune: () => {},
    decline: () => {},
    invalidate: () => {},
    on: () => {}
  };
}

// Export WebSocket client
export const webSocketClient = {
  send: () => {},
  onMessage: () => {}
};

// Export Style functions
export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { return Promise.resolve(); }

// Export Error Overlay
export const ErrorOverlay = {
  hasErrorOverlay: () => false,
  clearErrorOverlay: () => {},
  processError: () => {}
};

console.log("[@vite/client] Mock client loaded successfully");