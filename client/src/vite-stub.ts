/**
 * VITE HMR STUB MODULE
 * This file provides empty implementations of Vite HMR APIs
 * to prevent errors when HMR functionality is imported or used.
 */

// Empty HMR context functions
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

// Empty WebSocket client functions
export const webSocketClient = {
  send: () => {},
  onMessage: () => {},
  close: () => {},
  connect: () => {},
  connected: false
};

// Empty utility functions
export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { return Promise.resolve(); }

// Empty error overlay
export const ErrorOverlay = {
  send: () => {},
  customEmit: () => {}
};

// Mark HMR as disabled
export const hmrEnabled = false;
export const enabledFlag = false;

// Expose these to mimic Vite's client API
export default {
  createHotContext,
  webSocketClient,
  updateStyle,
  removeStyle,
  fetchUpdate,
  ErrorOverlay,
  hmrEnabled,
  enabledFlag
};