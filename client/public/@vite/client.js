// Empty @vite/client implementation to prevent WebSocket errors
console.log('[Vite Client Stub] Successfully replaced original @vite/client');

// Export empty implementations of all expected functions
export const ErrorOverlay = {
  createApp: () => null,
  render: () => null,
  onCloseOverlay: () => {},
  onErrorClick: () => {}
};

export const createHotContext = () => ({
  accept: () => {},
  prune: () => {},
  dispose: () => {},
  decline: () => {},
  invalidate: () => {},
  on: () => {}
});

export const updateStyle = () => {};
export const removeStyle = () => {};
export const fetchUpdate = () => Promise.resolve({ type: 'js-update', timestamp: Date.now() });
export const injectQuery = (url) => url;

export function createWebSocketClient() {
  return {
    send: () => {},
    close: () => {},
    addEventListener: () => {},
    removeEventListener: () => {}
  };
}

export function reload() {
  console.log('[Vite Client Stub] Reload requested but ignored');
}

// No actual implementation needed for these
export const webSocketClient = createWebSocketClient();
export const devtoolsClient = createWebSocketClient();