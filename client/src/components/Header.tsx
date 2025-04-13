import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import stackrLogoSvg from "../assets/stackr-logo.svg";
import stackrLogoPng from "../assets/stackr-logo.png";

interface HeaderProps {
  waitlistUrl: string;
}

export default function Header({ waitlistUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <div>
      {/* Accessibility skip link - hidden visually but available for screen readers and keyboard navigation */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:p-4 focus:bg-white focus:z-[60] focus:top-0 focus:left-0 focus:text-primary"
      >
        Skip to main content
      </a>
      
      <nav 
        className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              {/* Logo */}
              <a 
                href="/" 
                className="flex items-center space-x-2"
                aria-label="Stackr Financial - Home"
              >
                <div className="relative w-auto h-auto">
                  <picture>
                    {/* SVG for modern browsers (better quality at all sizes) */}
                    <source srcSet={stackrLogoSvg} type="image/svg+xml" />
                    {/* PNG fallback for older browsers */}
                    <img 
                      src={stackrLogoPng}
                      alt="Stackr Logo" 
                      className="h-auto w-auto max-h-8 sm:max-h-10 md:max-h-12 lg:max-h-14 object-contain" 
                      width="auto" 
                      height="auto"
                      loading="eager"
                      style={{ 
                        minWidth: '100px', 
                        maxWidth: '160px',
                        objectFit: 'contain',
                        aspectRatio: '3.5/1'
                      }}
                    />
                  </picture>
                </div>
                <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">beta</span>
              </a>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              <div className="flex items-center space-x-6">
                <a 
                  href="#benefits" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  Benefits
                </a>
                <a 
                  href="#how-it-works" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  How It Works
                </a>
                <a 
                  href="#calculator" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  Calculator
                </a>
                <a 
                  href="#security" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  Security
                </a>
                <a 
                  href="#faqs" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  FAQs
                </a>
                <a 
                  href="/toast-demo" 
                  className="text-gray-600 hover:text-primary font-medium px-1"
                >
                  Toast Demo
                </a>
              </div>
              <Button 
                className="bg-primary hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-200 ml-2"
                data-tally-open="3NO0eG"
                data-tally-width="500" 
                data-tally-emoji-text="👋" 
                data-tally-emoji-animation="wave"
                aria-label="Join Stackr waitlist"
              >
                Join Waitlist
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button 
                onClick={toggleMobileMenu}
                type="button" 
                className="text-gray-500 hover:text-primary focus:outline-none"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-6 w-6" aria-hidden="true" />
                )}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md">
            <div className="px-4 pt-3 pb-4 space-y-2 sm:px-5">
              <a 
                href="#benefits" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Benefits
              </a>
              <a 
                href="#how-it-works" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                How It Works
              </a>
              <a 
                href="#calculator" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Calculator
              </a>
              <a 
                href="#security" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Security
              </a>
              <a 
                href="#faqs" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                FAQs
              </a>
              <a 
                href="/toast-demo" 
                className="block px-4 py-3 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Toast Demo
              </a>
              <button 
                className="block w-full px-4 py-3 mt-2 text-center rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg transform hover:-translate-y-1 hover:scale-105 transition-all duration-200"
                onClick={() => setMobileMenuOpen(false)}
                data-tally-open="3NO0eG"
                data-tally-width="500" 
                data-tally-emoji-text="👋" 
                data-tally-emoji-animation="wave"
              >
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}