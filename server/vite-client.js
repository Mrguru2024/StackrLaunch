// Vite client with React Refresh support
const socket = new WebSocket(`ws://${window.location.host}/__vite_ws`);

socket.addEventListener('message', async ({ data }) => {
  const payload = JSON.parse(data);

  if (payload.type === 'full-reload') {
    window.location.reload();
  }

  if (payload.type === 'update') {
    const { path, timestamp } = payload;
    const mod = await import(`${path}?t=${timestamp}`);

    if (mod.default) {
      const hot = window.__vite_react_refresh__?.getHotContext(path);
      if (hot) {
        hot.accept();
      }
    }
  }
});

// React Refresh runtime
window.__vite_react_refresh__ = {
  hotContexts: new Map(),

  getHotContext(path) {
    if (!this.hotContexts.has(path)) {
      this.hotContexts.set(path, {
        accept: () => {
          console.log(`[vite] hot updated: ${path}`);
        },
      });
    }
    return this.hotContexts.get(path);
  },
};

export function createHotContext(path) {
  return window.__vite_react_refresh__.getHotContext(path);
}
