// vite-ws-blocker-sw.js - Service Worker to block WebSocket connections

self.addEventListener('install', (event) => {
  console.log('[SW] Installing WebSocket blocking Service Worker');
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', (event) => {
  console.log('[SW] WebSocket blocking Service Worker activated');
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

// Intercept fetch requests for WebSocket upgrade
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Check if this is a WebSocket connection attempt
  if (
    // Detect by URL patterns
    url.pathname.includes('/__vite_hmr') ||
    url.pathname.includes('/@vite/client') ||
    url.pathname.includes('/vite/') ||
    url.pathname.includes('/ws') ||
    // Look for WebSocket upgrade headers
    (event.request.headers.get('Upgrade') === 'websocket' || 
     event.request.headers.get('Connection')?.includes('Upgrade'))
  ) {
    console.log('[SW] Blocking WebSocket connection to:', url.toString());
    
    // Return an empty response
    event.respondWith(
      new Response('WebSocket connection blocked by Service Worker', { 
        status: 200,
        headers: {'Content-Type': 'text/plain'}
      })
    );
    return;
  }
});