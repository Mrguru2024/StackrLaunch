// Only do this on the client
if (typeof window !== "undefined") {
  const ws = window.location.hostname;
  const token = (window as any).__vite_ws_token || "";
  const hmrPort = 443;

  const wsUrl = `wss://${ws}:${hmrPort}/?token=${token}`;
  console.log("[vite-hmr-fix] Forcing HMR WebSocket URL to:", wsUrl);

  // Override global WebSocket to force this connection
  const _WebSocket = window.WebSocket;
  window.WebSocket = function (url: string, protocols?: string | string[]) {
    if (url.startsWith("wss://localhost:undefined")) {
      console.log("[vite-hmr-fix] Replacing invalid WebSocket URL with:", wsUrl);
      return new _WebSocket(wsUrl, protocols);
    }
    return new _WebSocket(url, protocols);
  } as any;
}