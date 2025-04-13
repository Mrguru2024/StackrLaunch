/**
 * Empty stub implementation for @fs/@vite/client
 * This completely prevents any HMR functionality and WebSocket connections
 */

console.log('[vite/client stub @fs path] Loaded empty implementation - no WebSockets will be created');

// Export empty implementations of all the functions and objects that might be imported
export const webSocketClient = {
  send: () => {},
  close: () => {},
  addEventListener: () => {},
  removeEventListener: () => {}
};

export const devtoolsClient = {
  connected: false,
  enabled: false,
  send: () => {}
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
  createApp: () => {},
  render: () => {}
};

export function updateStyle() {}
export function removeStyle() {}
export function fetchUpdate() { 
  return Promise.resolve({ type: 'js-update', timestamp: Date.now() });
}

// No WebSocket functionality
export function setupWebSocket() {
  console.log('[vite/client stub] WebSocket setup prevented');
  return {
    send: () => {},
    close: () => {}
  };
}

// Log that the stub was loaded successfully
console.log('[vite/client stub @fs path] Successfully prevented WebSocket connections');