import { 
  Facebook, 
  Instagram, 
  Linkedin 
} from "lucide-react";
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
              <a 
                href="https://threads.net/@stackr.tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Threads"
              >
                {/* Inline SVG for Threads logo */}
                <svg 
                  viewBox="0 0 24 24" 
                  className="h-5 w-5" 
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                >
                  <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.588 1.5 12.186c.013-3.464.875-6.413 2.563-8.76C6.175.257 10.517-.138 13.95.77c2.5.662 4.427 2.022 5.742 4.048.872 1.339 1.446 2.943 1.739 4.826.108.708.155 1.429.146 2.16-.02 2.027-.743 3.750-2.195 5.24-1.564 1.607-3.76 2.436-6.541 2.465-1.655.016-3.021-.513-4.038-1.571-1.05-1.095-1.633-2.666-1.66-4.59a10.676 10.676 0 01.086-1.54.42.42 0 01.4-.336h1.737c.256 0 .42.18.408.427-.012.118-.018.241-.018.368.021 2.645 1.057 4.008 3.144 4.143h.152c2.116-.142 3.23-1.386 3.374-3.76.032-.546.004-1.094-.084-1.635-.316-1.918-1.39-3.937-2.887-5.005-1.104-.79-2.46-1.181-4.032-1.165-1.657.019-3.054.639-4.144 1.84-1.095 1.207-1.717 2.786-1.851 4.677-.096 1.364.134 2.487.683 3.345.423.657 1.041 1.143 1.911 1.508.25.106.352.398.246.644l-.47 1.118a.42.42 0 01-.571.231c-1.443-.607-2.466-1.53-3.115-2.809-.755-1.485-1.09-3.286-.996-5.357.143-3.234 1.404-5.862 3.711-7.783 1.925-1.602 4.298-2.43 7.045-2.468 2.799-.046 5.129.761 6.828 2.353 1.725 1.612 2.665 3.753 2.791 6.349.122 2.503-.315 4.69-1.297 6.494-1.293 2.39-3.32 3.78-6.03 4.124-.44.057-.899.086-1.39.086z"/>
                </svg>
              </a>
              <a 
                href="https://facebook.com/profile.php?id=61575053828418" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://instagram.com/stackr.tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com/company/stackr-tech" 
                className="text-gray-400 hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Stackr on LinkedIn"
              >
                <Linkedin className="h-5 w-5" />
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
