/**
 * Complete Vite Client Override
 * 
 * This file completely replaces Vite's actual client module with a stub implementation
 * that prevents WebSocket connections and related errors.
 */

console.log('[@vite/client] Loading stub implementation - WebSocket connections disabled');

// Empty implementations of all Vite client exports
export const webSocketClient = {
  sendMessage: () => {},
  send: () => {},
  close: () => {},
  isReady: () => false,
  initialize: () => {}
};

export const devtoolsClient = {
  onDevToolsMessage: () => {},
  connectDevTools: () => {}
};

export function createHotContext() {
  return {
    accept: () => {},
    dispose: () => {},
    invalidate: () => {},
    decline: () => {},
    on: () => {},
    prune: () => {}
  };
}

export const ErrorOverlay = {
  createBase: () => {},
  customize: () => {}
};

export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { return Promise.resolve(); }
export function setupWebSocket() {}
export function enableOverlay() {}
export function createHotContext() {}
export function decode() {}
export function transformCode() {}