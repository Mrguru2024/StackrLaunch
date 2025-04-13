/**
 * Service Worker specifically to handle WebSocket connection issues
 * This intercepts and blocks any WebSocket connections to localhost:undefined
 */

// Use a valid port for WebSocket connections
const VALID_PORT = '5000';

// Activate immediately
self.addEventListener('install', function(event) {
  console.log('[Service Worker] Installed');
  self.skipWaiting(); // Activate immediately
});

self.addEventListener('activate', function(event) {
  console.log('[Service Worker] Activated');
  event.waitUntil(self.clients.claim()); // Take control of all clients
});

// Define WebSocket class with fixed port
class FixedWebSocket extends WebSocket {
  constructor(url, protocols) {
    // Fix the URL if it contains localhost:undefined
    if (url.includes('localhost:undefined')) {
      url = url.replace('localhost:undefined', 'localhost:' + VALID_PORT);
      console.log('[Service Worker] Fixed WebSocket URL:', url);
    }
    super(url, protocols);
  }
}

// Override WebSocket globally
if (typeof WebSocket !== 'undefined') {
  console.log('[Service Worker] Patching WebSocket constructor');
  WebSocket = FixedWebSocket;
}

// No need to handle fetch events for this specific service worker
console.log('[Service Worker] WebSocket fix ready');