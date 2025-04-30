'use client';

import { Button } from '@/components/ui/button';

// Use the original StackZen logo
const logoSrc = '/StackZenOriginalLogo.svg';

export default function Header() {
  return (
    <div className="w-full">
      <nav
        className="fixed top-0 left-0 right-0 z-50"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[500px] mx-auto px-4">
          <div className="flex justify-center items-center h-32">
            {/* Logo */}
            <a
              href="/"
              className="flex items-center justify-center space-x-4 group"
              aria-label="StackZen Financial - Home"
            >
              <div className="relative w-[500px] h-[500px] flex items-center justify-center">
                <img
                  src={logoSrc}
                  alt="StackZen Logo"
                  className="w-full h-full object-contain select-none transition-transform duration-300 group-hover:scale-105"
                  width="500"
                  height="500"
                  loading="eager"
                  style={{
                    imageRendering: 'crisp-edges',
                    WebkitFontSmoothing: 'antialiased',
                    MozOsxFontSmoothing: 'grayscale',
                  }}
                />
              </div>
              <span className="bg-[#00C6A7] text-[#233D4D] text-base px-4 py-2 rounded-full uppercase font-bold tracking-wider shadow-sm hover:shadow-md transition-shadow duration-300">
                beta
              </span>
            </a>
          </div>
        </div>
      </nav>
    </div>
  );
}
