// ShareLinks.tsx
import React from 'react';

export default function ShareLinks() {
  return (
    <div className="py-4 border-t border-gray-700 mt-4">
      <h3 className="text-white font-bold mb-3">Share Stackr</h3>
      <div className="flex flex-wrap gap-3">
        <a 
          href="https://threads.net/@stackr.tech" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Threads
        </a>
        <a 
          href="https://facebook.com/profile.php?id=61575053828418" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a 
          href="https://instagram.com/stackr.tech" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
        <a 
          href="https://linkedin.com/company/stackr-tech" 
          className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-md transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          LinkedIn
        </a>
      </div>
    </div>
  );
}