/**
 * Vite Client Stub for Production
 * 
 * This serves as a replacement for Vite's HMR client in production
 * to prevent errors related to missing import.meta
 */

// Empty HMR functions
export function createHotContext() {
  return {
    accept: () => {},
    dispose: () => {},
    prune: () => {},
    decline: () => {},
    invalidate: () => {},
    on: () => {}
  };
}

// Empty WebSocket client
export const webSocketClient = {
  send: () => {},
  onMessage: () => {}
};

// Empty style functions
export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { return Promise.resolve(); }

// Empty error overlay
export const ErrorOverlay = {
  hasErrorOverlay: () => false,
  clearErrorOverlay: () => {},
  processError: () => {}
};

// Disable flags
export const hmrEnabled = false;
export const enabledFlag = false;