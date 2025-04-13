import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import stackrLogo from "../assets/stackr-logo.png";

interface HeaderProps {
  waitlistUrl: string;
}

export default function Header({ waitlistUrl }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            {/* Logo */}
            <a href="#" className="flex items-center space-x-2">
              <img src={stackrLogo} alt="Stackr Logo" className="h-8" />
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">beta</span>
            </a>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#benefits" className="text-gray-600 hover:text-primary font-medium">Benefits</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-primary font-medium">How It Works</a>
            <a href="#security" className="text-gray-600 hover:text-primary font-medium">Security</a>
            <a href="#testimonials" className="text-gray-600 hover:text-primary font-medium">Testimonials</a>
            <Button 
              className="bg-primary hover:bg-primary/90"
              data-tally-open="3NO0eG"
              data-tally-width="500" 
              data-tally-emoji-text="👋" 
              data-tally-emoji-animation="wave"
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
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <a 
              href="#benefits" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefits
            </a>
            <a 
              href="#how-it-works" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#security" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Security
            </a>
            <a 
              href="#testimonials" 
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50"
              onClick={() => setMobileMenuOpen(false)}
            >
              Testimonials
            </a>
            <button 
              className="block w-full px-3 py-2 text-center rounded-md text-base font-medium bg-primary text-white hover:bg-primary/90"
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
  );
}
