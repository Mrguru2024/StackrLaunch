import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";
import stackrPromo from "../assets/stackr-promo.mp4";

interface HeroSectionProps {
  waitlistUrl: string;
}

export default function HeroSection({ waitlistUrl }: HeroSectionProps) {
  return (
    <section className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-white via-purple-50 to-green-50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Column: Text Content */}
          <motion.div 
            className="lg:col-span-6 space-y-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900">
                <span className="block">Smart financial</span>
                <span className="block text-primary">automation for doers</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-600 mt-6">
                Stackr helps tradespeople, side hustlers, and 9-5 rebuilders automate their finances, save money, and grow wealth effortlessly.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button 
                size="lg" 
                className="inline-flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
                data-tally-open="3NO0eG"
                data-tally-width="500" 
                data-tally-emoji-text="👋" 
                data-tally-emoji-animation="wave"
              >
                Join the Waitlist
                <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Button>
              
              <div className="text-gray-500 text-sm md:text-base">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span>Free early access</span>
                </div>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 mt-8 pt-4 border-t border-gray-200">
              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-gray-300 flex items-center justify-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">432+ people</span> have already joined the waitlist
              </div>
            </div>
          </motion.div>
          
          {/* Right Column: Hero Image */}
          <motion.div 
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="rounded-xl shadow-2xl overflow-hidden relative z-10 transform lg:translate-x-6 hover:scale-105 transition-transform duration-500">
              <video 
                className="w-full h-auto md:h-96 object-cover"
                autoPlay 
                loop 
                muted 
                playsInline
                controls
              >
                <source src={stackrPromo} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/10 to-transparent opacity-30 pointer-events-none"></div>
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full opacity-10 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-green-600 rounded-full opacity-10 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
