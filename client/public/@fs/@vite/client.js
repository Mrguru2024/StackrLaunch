/**
 * Empty stub implementation for @fs/@vite/client
 * This completely prevents any HMR functionality and WebSocket connections
 */

export const webSocketClient = {
  send: () => {},
  onMessage: () => {},
  close: () => {},
  connected: false
};

export const devtoolsClient = {
  enabled: false,
  connected: false
};

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

export const ErrorOverlay = {
  customEmit: () => {},
  send: () => {}
};

export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { return Promise.resolve(); }
export function setupWebSocket() {}
export function enableOverlay() {}
export function createHotContext() {}
export function decode() {}
export function transformCode() {}