'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { CheckCircle, BadgePercent, Clock, Shield } from 'lucide-react';

interface HeroSectionProps {
  waitlistUrl: string;
}

export default function HeroSection({ waitlistUrl }: HeroSectionProps) {
  return (
    <section
      id="hero-section"
      className="pt-28 pb-16 md:pt-32 md:pb-24 px-4 bg-gradient-to-br from-white via-neutral-light/30 to-secondary/5 overflow-hidden"
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
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-foreground"
                itemProp="headline"
              >
                <span className="block">AI Financial Automation</span>
                <span className="block text-primary">For Tradespeople & Side Hustlers</span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground mt-6" itemProp="description">
                Stackr helps{' '}
                <span className="font-semibold text-foreground">
                  tradespeople, side hustlers, and 9-5 rebuilders
                </span>{' '}
                automate income, eliminate hidden fees, and grow wealth without spreadsheets or
                bookkeeping.
              </p>

              {/* Key benefits highlighted for SEO and conversion */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-8">
                <div className="flex items-start space-x-3">
                  <BadgePercent className="h-6 w-6 text-primary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Save $650/year</span>
                    <span className="text-muted-foreground text-sm">
                      Automatic hidden fee detection
                    </span>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="h-6 w-6 text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-foreground block">Save 5+ hours monthly</span>
                    <span className="text-muted-foreground text-sm">No manual tracking needed</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-4">
              <Button
                size="lg"
                className="inline-flex justify-center items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200 hover:scale-105"
                data-tally-open={waitlistUrl.split('/').pop()}
                data-tally-width="700"
                data-tally-emoji-text="👋"
                data-tally-emoji-animation="wave"
                data-tally-auto-close="0"
                data-tally-layout="modal"
                aria-label="Join the Stackr waitlist for early access"
              >
                Join the Waitlist
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </Button>

              <div className="text-muted-foreground text-sm md:text-base">
                <div className="flex items-center">
                  <CheckCircle className="w-5 h-5 text-secondary mr-2" aria-hidden="true" />
                  <span>Free early access</span>
                </div>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-5 h-5 text-secondary mr-2" aria-hidden="true" />
                  <span>No credit card required</span>
                </div>
              </div>
            </div>

            <div
              className="flex items-center space-x-4 mt-8 pt-4 border-t border-border"
              itemScope
              itemType="https://schema.org/AggregateRating"
            >
              <meta itemProp="ratingValue" content="4.9" />
              <meta itemProp="bestRating" content="5" />
              <meta itemProp="ratingCount" content="131" />
              <meta itemProp="reviewCount" content="131" />

              <div className="flex -space-x-2">
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground">
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
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground">
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
                <div className="w-10 h-10 rounded-full border-2 border-background bg-muted flex items-center justify-center text-muted-foreground">
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
              <div className="text-sm text-muted-foreground">
                <span className="font-semibold text-foreground">131+ people</span> have already
                joined the waitlist
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
            <div className="rounded-xl shadow-2xl overflow-hidden relative z-10 transform lg:translate-x-6 hover:scale-105 transition-transform duration-500">
              <video
                className="w-full h-auto md:h-96 object-cover"
                autoPlay
                loop
                muted
                playsInline
                controls
                title="Stackr Financial Automation Demo"
                aria-label="Video demonstration of the Stackr financial automation platform"
                preload="metadata"
              >
                <source src="/videos/stackr-promo.mp4" type="video/mp4" />
                <track kind="descriptions" src="" label="English descriptions" />
                Your browser does not support the video tag. Please upgrade to a modern browser.
              </video>
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/10 to-transparent opacity-30 pointer-events-none"></div>
            </div>

            {/* Security badge for trust */}
            <div className="absolute -bottom-4 right-4 z-20 bg-white rounded-lg shadow-lg px-4 py-2 flex items-center space-x-2">
              <Shield className="h-5 w-5 text-secondary" />
              <span className="text-xs font-semibold text-foreground">Bank-Level Encryption</span>
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary rounded-full opacity-10 blur-2xl"></div>
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-secondary rounded-full opacity-10 blur-2xl"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
