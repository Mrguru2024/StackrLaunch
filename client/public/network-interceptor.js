/**
 * Network Request Interceptor
 * 
 * This script intercepts network requests to prevent loading of Vite HMR client modules.
 */

(function() {
  console.log('[Network Interceptor] Initializing...');
  
  // Intercept fetch API
  const originalFetch = window.fetch;
  window.fetch = function(resource, options) {
    // Convert resource to string if it's a Request object
    const url = resource && typeof resource === 'object' && resource.url ? 
                resource.url : 
                String(resource);
    
    // Block Vite client modules
    if (url && (
        url.includes('/@vite/client') || 
        url.includes('@fs/@vite/client') ||
        url.includes('/@react-refresh') ||
        url.includes('hmr')
    )) {
      console.log('[Network Interceptor] Blocked fetch request to:', url);
      return Promise.reject(new TypeError(`Failed to fetch ${url}: Network interceptor blocked the request`));
    }
    
    // Allow all other requests
    return originalFetch.apply(this, arguments);
  };
  
  // Intercept XMLHttpRequest
  const originalXHROpen = XMLHttpRequest.prototype.open;
  XMLHttpRequest.prototype.open = function(method, url, ...rest) {
    if (url && (
        url.includes('/@vite/client') || 
        url.includes('@fs/@vite/client') ||
        url.includes('/@react-refresh') ||
        url.includes('hmr')
    )) {
      console.log('[Network Interceptor] Blocked XHR request to:', url);
      this.abort();
      return;
    }
    
    return originalXHROpen.call(this, method, url, ...rest);
  };
  
  // Also block specific script tags from being loaded
  const originalCreateElement = document.createElement;
  document.createElement = function(tagName) {
    const element = originalCreateElement.call(document, tagName);
    
    if (tagName.toLowerCase() === 'script') {
      const originalSetAttribute = element.setAttribute;
      element.setAttribute = function(name, value) {
        if (name === 'src' && (
            value.includes('/@vite/client') || 
            value.includes('@fs/@vite/client') ||
            value.includes('/@react-refresh')
        )) {
          console.log('[Network Interceptor] Blocked script loading:', value);
          return element;
        }
        
        return originalSetAttribute.call(this, name, value);
      };
    }
    
    return element;
  };
  
  console.log('[Network Interceptor] Successfully initialized');
})();