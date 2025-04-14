/**
 * ERROR DETECTOR SCRIPT
 * 
 * This script automatically detects import.meta or other critical errors
 * and redirects to the fallback page after a short delay.
 */

(function() {
  console.log("[ERROR-DETECTOR] Setting up error detector");
  
  // Track errors that would indicate we need to use the fallback
  let criticalErrorDetected = false;
  let errorCount = 0;
  
  // Store original error handler
  const originalError = console.error;
  
  // Override error handling to detect critical errors
  console.error = function() {
    const args = Array.from(arguments);
    
    // Check for critical errors that indicate we need to use fallback
    if (args.some(arg => 
      typeof arg === 'string' && (
        arg.includes('import.meta') || 
        arg.includes('Cannot use import.meta outside a module') ||
        arg.includes('Failed to load') ||
        arg.includes('unexpected token')
      )
    )) {
      criticalErrorDetected = true;
      errorCount++;
      
      console.log("[ERROR-DETECTOR] Critical error detected #" + errorCount);
      
      // If we detect multiple critical errors, redirect to fallback
      if (errorCount >= 2) {
        console.log("[ERROR-DETECTOR] Multiple critical errors detected, redirecting to fallback");
        redirectToFallback();
      }
    }
    
    // Pass through to original error handler
    return originalError.apply(this, arguments);
  };
  
  // Function to redirect to the fallback page
  function redirectToFallback() {
    if (window.location.pathname !== '/fallback') {
      console.log("[ERROR-DETECTOR] Redirecting to fallback page");
      window.location.href = '/fallback';
    }
  }
  
  // Set a timeout to check for blank page (no content rendered)
  window.setTimeout(function() {
    // Check if the React root is empty
    const rootElement = document.getElementById('root');
    if (rootElement && (!rootElement.hasChildNodes() || rootElement.children.length === 0)) {
      console.log("[ERROR-DETECTOR] Blank page detected, redirecting to fallback");
      redirectToFallback();
    }
  }, 3000); // Wait 3 seconds
  
  console.log("[ERROR-DETECTOR] Error detector installed successfully");
})();