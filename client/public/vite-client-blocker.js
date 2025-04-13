// Intercepts and blocks network requests to @vite/client
(() => {
  // Create a custom fetch to intercept @vite/client requests
  const originalFetch = window.fetch;
  window.fetch = function(resource, options) {
    if (resource && typeof resource === 'string' && 
        (resource.includes('@vite/client') || 
         resource.includes('vite/dist/client'))) {
      console.log('[Fetch Interceptor] Blocked request to:', resource);
      // Return a fake successful response
      return Promise.resolve(new Response('// Empty module', {
        status: 200,
        headers: { 'Content-Type': 'application/javascript' }
      }));
    }
    return originalFetch.apply(this, arguments);
  };

  // Intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url) {
    if (url && typeof url === 'string' && 
        (url.includes('@vite/client') || 
         url.includes('vite/dist/client'))) {
      console.log('[XHR Interceptor] Blocked request to:', url);
      // Modify the URL to a non-existent one
      arguments[1] = 'about:blank';
    }
    return originalXHROpen.apply(this, arguments);
  };

  // Monitor for dynamic imports or script injections
  const observer = new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        for (const node of mutation.addedNodes) {
          if (node.tagName === 'SCRIPT') {
            const src = node.src || '';
            if (src.includes('@vite/client') || src.includes('vite/dist/client')) {
              console.log('[DOM Observer] Removing Vite client script:', src);
              node.remove();
            }
          }
        }
      }
    }
  });
  
  // Start observing the document for script additions
  observer.observe(document, { 
    childList: true, 
    subtree: true 
  });

  console.log('[Vite Client Blocker] Successfully installed interceptors');
})();