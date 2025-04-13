// Service worker to intercept and block WebSocket connections
// This prevents the WebSocket connection errors in the console

self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installing Service Worker to block WebSockets...');
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activating Service Worker to block WebSockets...');
  return self.clients.claim();
});

// Intercept fetch requests for WebSocket connections
self.addEventListener('fetch', (event) => {
  const url = event.request.url;
  
  // If it's a WebSocket request to localhost, block it
  if (url.startsWith('ws:') || url.startsWith('wss:')) {
    if (url.includes('localhost') || url.includes('undefined')) {
      console.log('[Service Worker] Blocked WebSocket request:', url);
      // Return an empty response
      event.respondWith(new Response('', {
        status: 200,
        statusText: 'WebSocket Blocked'
      }));
      return;
    }
  }
});