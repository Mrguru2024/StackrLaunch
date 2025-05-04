'use client';

import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { ArrowRight, Bot, CircleDollarSign } from 'lucide-react';

interface HeroSectionProps {
  waitlistUrl?: string;
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options: {
          layout: string;
          width: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          emoji?: {
            text: string;
            animation: string;
          };
          hiddenFields?: {
            [key: string]: string;
          };
        }
      ) => void;
    };
  }
}

export default function HeroSection({ waitlistUrl }: HeroSectionProps) {
  const handleWaitlistClick = () => {
    if (window.Tally) {
      window.Tally.openPopup('3NO0eG', {
        layout: 'modal',
        width: 500,
        emoji: {
          text: '👋',
          animation: 'wave',
        },
      });
    } else {
      // Fallback in case the Tally script hasn't loaded
      window.location.href = waitlistUrl || 'https://tally.so/r/3NO0eG';
    }
  };

  return (
    <section
      id="hero-section"
      className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 overflow-hidden bg-white dark:bg-gray-900"
      aria-labelledby="hero-heading"
    >
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
              <h1
                id="hero-heading"
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#233D4D] dark:text-white"
                itemProp="headline"
              >
                <span className="block">AI Financial Automation</span>
                <span className="block text-[#00C6A7] dark:text-[#00C6A7]">
                  For Tradespeople & Side Hustlers
                </span>
              </h1>

              <p
                className="text-xl md:text-2xl text-[#58C1E2] dark:text-white font-semibold mt-6"
                itemProp="description"
              >
                StackZen helps{' '}
                <span className="font-semibold text-[#F4A300] dark:text-[#F4A300]">
                  tradespeople, side hustlers, and 9-5 rebuilders
                </span>{' '}
                automate income, eliminate hidden fees, and grow wealth without spreadsheets or
                bookkeeping.
              </p>

              {/* Key benefits highlighted for SEO and conversion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start space-x-3">
                  <CircleDollarSign className="h-6 w-6 text-[#00C6A7] dark:text-[#00C6A7] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#233D4D] dark:text-white block">
                      Save $650/year
                    </span>
                    <span className="text-[#00C6A7] dark:text-[#00C6A7] text-sm">
                      Automatic hidden fee detection
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Bot className="h-6 w-6 text-[#00C6A7] dark:text-[#00C6A7] flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-[#233D4D] dark:text-[#00C6A7] block">
                      Save 5+ hours monthly
                    </span>
                    <span className="text-[#00C6A7] dark:text-[#00C6A7] text-sm">
                      No manual tracking needed
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="inline-flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:scale-105 bg-[#00C6A7] text-white hover:bg-[#233D4D] dark:bg-primary dark:text-white dark:hover:bg-primary/80"
                onClick={handleWaitlistClick}
                aria-label="Join the StackZen waitlist for early access"
              >
                Join the Waitlist
                <ArrowRight className="ml-2 -mr-1 h-5 w-5" />
              </Button>

              <div className="text-[#58C1E2] dark:text-primary text-sm md:text-base">
                <div className="flex items-center">
                  <CircleDollarSign
                    className="w-5 h-5 text-[#00C6A7] dark:text-primary mr-2"
                    aria-hidden="true"
                  />
                  <span className="text-[#233D4D] dark:text-white">Free early access</span>
                </div>
                <div className="flex items-center mt-1">
                  <CircleDollarSign
                    className="w-5 h-5 text-[#00C6A7] dark:text-primary mr-2"
                    aria-hidden="true"
                  />
                  <span className="text-[#233D4D] dark:text-white">No credit card required</span>
                </div>
              </div>
            </div>

            <div
              className="flex items-center space-x-4 mt-8 pt-4 border-t border-[#E5E9F0] dark:border-gray-700"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <meta itemProp="ratingValue" content="4.9" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="ratingCount" content="17" />
              <meta itemProp="reviewCount" content="17" />

              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F5F7FA] dark:bg-gray-800 flex items-center justify-center text-[#58C1E2] dark:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F5F7FA] dark:bg-gray-800 flex items-center justify-center text-[#58C1E2] dark:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
                <div className="w-10 h-10 rounded-full border-2 border-white bg-[#F5F7FA] dark:bg-gray-800 flex items-center justify-center text-[#58C1E2] dark:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                </div>
              </div>
              <div className="text-sm text-[#58C1E2] dark:text-primary">
                <span className="font-semibold text-[#233D4D] dark:text-white">17+ people</span>{' '}
                <span className="text-[#233D4D] dark:text-white">
                  have already joined the waitlist
                </span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Video */}
          <motion.div
            className="lg:col-span-6 relative"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative w-full rounded-xl overflow-hidden shadow-2xl">
              <video controls autoPlay loop playsInline className="w-full h-full object-cover">
                <source src="/Blue Gradient Modern Payment Mobile App Video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
