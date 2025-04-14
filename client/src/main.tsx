// Explicit imports to avoid any import.meta issues
import './index.css';
import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import App from './App';

// Advanced error handling for React rendering
try {
  // Make sure DOM is ready
  const renderApp = () => {
    try {
      const rootElement = document.getElementById("root");
      
      if (rootElement) {
        try {
          // Create root and render app
          const root = ReactDOM.createRoot(rootElement);
          root.render(React.createElement(React.Suspense, { 
            fallback: React.createElement('div', null, 'Loading...') 
          }, React.createElement(App)));
          console.log("App rendered successfully");
        } catch (renderError) {
          console.error("Error rendering app:", renderError);
          // Try direct DOM manipulation as a last resort
          rootElement.innerHTML = '<div style="margin:2rem;text-align:center"><h1>Stackr Financial</h1><p>Loading application...</p></div>';
        }
      } else {
        console.error("Root element not found");
      }
    } catch (innerError) {
      console.error("Inner rendering error:", innerError);
    }
  };

  // Run once DOM is fully loaded
  if (document.readyState === 'complete') {
    renderApp();
  } else {
    window.addEventListener('DOMContentLoaded', renderApp);
  }
} catch (outerError) {
  console.error("Outer error:", outerError);
}
