import { Link } from "wouter";
import stackrLogo from "../assets/stackr-logo.png";
import SocialLinks from "./SocialLinks";

interface FooterProps {
  waitlistUrl: string;
}

export default function Footer({ waitlistUrl }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img src={stackrLogo} alt="Stackr Logo" className="h-8 brightness-200" />
              <span className="bg-green-600 text-white text-xs px-2 py-1 rounded-full uppercase font-bold tracking-wider">beta</span>
            </div>
            <p className="text-gray-400 mb-6 max-w-md">
              Smart financial automation for tradespeople, side hustlers, and 9-5 rebuilders. Take control of your finances.
            </p>
            
            <SocialLinks />
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#benefits" className="text-gray-400 hover:text-white transition-colors">Benefits</a></li>
              <li><a href="#how-it-works" className="text-gray-400 hover:text-white transition-colors">How It Works</a></li>
              <li><a href="#testimonials" className="text-gray-400 hover:text-white transition-colors">Testimonials</a></li>
              <li>
                <button 
                  className="text-gray-400 hover:text-white transition-colors bg-transparent p-0 border-0 cursor-pointer"
                  data-tally-open="3NO0eG"
                  data-tally-width="500" 
                  data-tally-emoji-text="👋" 
                  data-tally-emoji-animation="wave"
                >
                  Join Waitlist
                </button>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-white font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</a></li>
              <li><Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>&copy; {new Date().getFullYear()} Stackr Financial, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}