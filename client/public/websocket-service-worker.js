/**
 * WebSocket Service Worker for Replit Environment
 * 
 * This service worker intercepts all network requests and patches WebSocket connections.
 */

// Register this service worker immediately
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/websocket-service-worker.js')
    .then(registration => {
      console.log('WebSocket fixing service worker registered:', registration.scope);
    })
    .catch(error => {
      console.error('Service worker registration failed:', error);
    });
}

// The actual service worker logic
self.addEventListener('install', event => {
  self.skipWaiting(); // Force activation
  console.log('WebSocket fixing service worker installed');
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim()); // Take control immediately
  console.log('WebSocket fixing service worker activated');
});

// Now instead of trying to intercept at the network level (which is complex),
// we'll communicate with the page to patch WebSockets there
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'WS_FIX_INITIALIZED') {
    console.log('WebSocket fix initialized in page');
  }
});

// Inform all clients when we activate
self.addEventListener('activate', event => {
  event.waitUntil(
    self.clients.matchAll().then(clients => {
      return Promise.all(
        clients.map(client => {
          return client.postMessage({
            type: 'WS_FIX_READY'
          });
        })
      );
    })
  );
});