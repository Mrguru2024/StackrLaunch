import { Link } from "wouter";
import stackrLogo from "../assets/stackr-logo.png";

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
            
            <div className="flex space-x-4">
              {/* Threads Icon */}
              <a 
                href="https://threads.net/@stackr.tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Threads"
              >
                <svg viewBox="0 0 448 512" className="h-5 w-5" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M331.5 235.7c2.2 .9 4.5 1.3 6.8 1.3 10.3 0 18.7-8.4 18.7-18.7 0-7.2-4.1-13.9-10.6-17.1-13.4-6.7-28.1-11.1-43.4-12.7-7.9-.8-15.9-1.2-23.9-1.2-70.7 0-128.2 57.5-128.2 128.2 0 3.1.1 6.2 .3 9.3 .3 5.2 .9 10.3 1.7 15.3 .7 4.3 4.4 7.4 8.6 7.4 .5 0 .9 0 1.4-.1 4.8-.8 8-5.5 7.2-10.2-.7-4.3-1.2-8.8-1.5-13.3-.2-2.7-.3-5.3-.3-8 0-58.1 47.2-105.3 105.3-105.3 6.8 0 13.7 .4 20.4 1 11.9 1.2 23.5 4.5 34.3 9.9zm-99.2 62.2c12.3-9.7 27.4-14.3 44.5-13.7 21.6 .7 40.2 15.5 51.2 41 4.3 10 6.5 21.8 6.5 34.4 0 1.7 0 3.3-.1 5-3 47.1-41.9 84.9-89.1 86.1-.4 0-.9 0-1.3 0-26.2 0-49.9-10.9-67.1-28.6-15.9-16.4-26.4-38.5-29.1-62.1-.3-2.7-.6-5.4-.7-8.2-.2-2.4-.2-4.8-.2-7.2 0-47.3 32.8-89.2 79.1-98.4 16.3-3.2 33.1-1.7 47.7 4.2 13 5.3 24.4 13.9 33.1 25.1 3.4 4.3 9.6 5.1 13.9 1.7s5.1-9.6 1.7-13.9c-11-13.8-25.3-24.6-41.6-31.2-18.4-7.4-38.8-9.4-58.7-5.4-56.9 11.3-98.2 65.3-98.2 123.6 0 3 .1 6 .3 9 .1 3.5 .5 6.9 .9 10.4 3.2 29.2 16.2 56.3 36.2 77.1 21.2 22 49.9 35.2 81.5 35.2 .5 0 1.1 0 1.6 0 59.5-1.6 108.5-48.4 112.2-107.6 .1-2.2 .2-4.5 .2-6.7 0-16.1-2.9-31.3-8.7-44.3-14.7-34.2-42.2-54.4-74.2-55.3-23.1-.8-44.5 5.8-61.4 19.3-21.1 16.8-33.8 42.4-33.8 68.4 0 3.2-2.6 5.8-5.8 5.8s-5.8-2.6-5.8-5.8c0-32.8 15.8-64.3 42.1-85.5z"/>
                </svg>
              </a>
              
              {/* Facebook Icon */}
              <a 
                href="https://facebook.com/profile.php?id=61575053828418" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Facebook"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                </svg>
              </a>
              
              {/* Instagram Icon */}
              <a 
                href="https://instagram.com/stackr.tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c5.52 0 10 4.48 10 10s-4.48 10-10 10S2 17.52 2 12 6.48 2 12 2zm0 2.5c-1.58 0-1.8 0-2.4.04-.64.03-1.25.13-1.8.38-.42.17-.8.4-1.1.7-.3.3-.54.68-.7 1.08-.25.56-.36 1.17-.38 1.8-.04.6-.04.84-.04 2.4 0 1.6 0 1.8.04 2.42.03.63.13 1.24.38 1.8.17.4.4.77.7 1.07.33.32.7.55 1.1.73.55.25 1.17.36 1.8.38.6.03.83.03 2.4.03 1.6 0 1.8 0 2.4-.03.63-.03 1.25-.13 1.8-.38.42-.18.78-.4 1.1-.73.3-.3.54-.67.7-1.08.25-.55.36-1.16.38-1.8.03-.6.03-.83.03-2.4 0-1.57 0-1.8-.03-2.4-.03-.63-.13-1.25-.38-1.8-.16-.4-.4-.77-.7-1.08-.32-.3-.67-.53-1.08-.7-.56-.25-1.17-.36-1.8-.38-.6-.04-.83-.04-2.4-.04h.02z"/>
                  <path d="M12 7.38c-2.56 0-4.63 2.06-4.63 4.62 0 2.56 2.07 4.62 4.63 4.62 2.56 0 4.63-2.06 4.63-4.62 0-2.56-2.07-4.62-4.63-4.62zm0 7.62c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z"/>
                  <path d="M17.5 7.13c0 .6-.48 1.08-1.08 1.08-.6 0-1.08-.48-1.08-1.08 0-.6.48-1.08 1.08-1.08.6 0 1.08.48 1.08 1.08z"/>
                </svg>
              </a>
              
              {/* LinkedIn Icon */}
              <a 
                href="https://linkedin.com/company/stackr-tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on LinkedIn"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.7 3H4.3C3.6 3 3 3.6 3 4.3v15.4c0 .7.6 1.3 1.3 1.3h15.4c.7 0 1.3-.6 1.3-1.3V4.3c0-.7-.6-1.3-1.3-1.3zM8.4 18.2H5.6v-8h2.8v8zM7 9c-.9 0-1.6-.7-1.6-1.6C5.4 6.5 6.1 6 7 6c.9 0 1.6.6 1.6 1.4C8.6 8.3 7.9 9 7 9zm11.2 9.2h-2.8v-4.4c0-1-.4-1.8-1.4-1.8-.7 0-1.2.5-1.4 1-.1.2-.1.4-.1.6v4.6H9.7V10h2.8v1.2c.4-.6 1-1.4 2.4-1.4 1.8 0 3.2 1.2 3.2 3.7v4.7z"/>
                </svg>
              </a>
            </div>
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
