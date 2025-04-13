// SocialLinks.tsx
import React from 'react';

export default function SocialLinks() {
  return (
    <div className="space-y-2 mb-6">
      <p className="text-lg text-white font-medium mb-3">Follow us:</p>
      <div className="grid grid-cols-2 gap-3">
        <a 
          href="https://threads.net/@stackr.tech" 
          className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-gray-700 rounded-full p-1 w-6 h-6 flex items-center justify-center mr-2">T</span>
          <span>Threads</span>
        </a>
        <a 
          href="https://facebook.com/profile.php?id=61575053828418" 
          className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-gray-700 rounded-full p-1 w-6 h-6 flex items-center justify-center mr-2">F</span>
          <span>Facebook</span>
        </a>
        <a 
          href="https://instagram.com/stackr.tech" 
          className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-gray-700 rounded-full p-1 w-6 h-6 flex items-center justify-center mr-2">I</span>
          <span>Instagram</span>
        </a>
        <a 
          href="https://linkedin.com/company/stackr-tech" 
          className="text-gray-400 hover:text-white transition-colors inline-flex items-center space-x-2"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="bg-gray-700 rounded-full p-1 w-6 h-6 flex items-center justify-center mr-2">L</span>
          <span>LinkedIn</span>
        </a>
      </div>
    </div>
  );
}