/**
 * Intercepts any attempts to import the Vite client module
 * and replaces it with a dummy implementation to prevent WebSocket errors
 */

(function() {
  console.log('[vite-import-interceptor] Setting up module import interception');

  // Store the original import function
  const originalImport = window.import || Function.prototype;

  // Create a mock Vite client module
  const mockViteClient = {
    setupWebSocket: function() {
      console.log('[vite-import-interceptor] Prevented WebSocket setup');
      return {
        send: () => {},
        close: () => {}
      };
    },
    HMR_TIMEOUT: 0,
    ErrorOverlay: {
      createApp: () => {},
      render: () => {}
    },
    createHotContext: () => ({
      accept: () => {},
      prune: () => {},
      dispose: () => {},
      decline: () => {},
      invalidate: () => {},
      on: () => {}
    }),
    updateStyle: () => {},
    removeStyle: () => {},
    fetchUpdate: () => Promise.resolve({ type: 'js-update', timestamp: Date.now() }),
    webSocketClient: {
      send: () => {},
      close: () => {},
      addEventListener: () => {}
    },
    devtoolsClient: {
      enabled: false
    }
  };

  // Create a list of Vite client module paths to intercept
  const viteClientPaths = [
    '/@vite/client',
    '/@id/vite/client',
    '@vite/client',
    '/vite/client',
    'vite/client',
    'vite/dist/client/client.js'
  ];

  // Override the import function
  window.import = function(path) {
    // Check if this is a Vite client import
    if (typeof path === 'string' && viteClientPaths.some(vp => path.includes(vp))) {
      console.log('[vite-import-interceptor] Intercepted Vite client import:', path);
      return Promise.resolve(mockViteClient);
    }
    
    // Otherwise, use the original import
    return originalImport.call(this, path);
  };

  // Also override dynamic imports in module scripts
  // This uses a MutationObserver to modify script tags before they're executed
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === 'SCRIPT' && node.type === 'module') {
            // Check if script contains imports to Vite client
            viteClientPaths.forEach(vp => {
              if (node.textContent.includes(vp)) {
                // Replace the import with our mock
                node.textContent = node.textContent.replace(
                  new RegExp(`import [^;]+ from ['"]${vp}['"][;]?`, 'g'),
                  `// Blocked import from ${vp}\n`
                );
              }
            });
          }
        });
      }
    });
  });

  // Start observing the document
  observer.observe(document, { childList: true, subtree: true });

  console.log('[vite-import-interceptor] Import interception setup complete');

  // Also disable any existing websocket usage
  window.__vite_ws_disabled__ = true;
  window.__vite_hmr_disabled__ = true;
  window.__VITE_HMR_DISABLED__ = true;
  window.__VITE_HMR_TIMEOUT_FIRED__ = true;
})();