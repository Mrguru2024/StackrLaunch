'use client';

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-purple-50 to-indigo-50" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <motion.h1
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Financial Automation for
            <span className="text-primary"> Variable Income</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            StackZen uses AI to automate your finances, eliminate hidden fees, and grow your wealth
            - perfect for tradespeople, side hustlers, and 9-5 rebuilders.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Button
              size="lg"
              className="text-lg px-8 py-6"
              data-tally-open="3NO0eG"
              data-tally-emoji-text="👋"
              data-tally-emoji-animation="wave"
              data-tally-auto-close="0"
              data-tally-layout="modal"
              data-tally-width="700"
            >
              Join Waitlist
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="text-lg px-8 py-6"
              onClick={() =>
                document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })
              }
            >
              See How Much You'll Save
            </Button>
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center space-x-3">
              <TrendingUp className="h-6 w-6 text-primary" />
              <span className="text-gray-600">Save $650/year on average</span>
            </div>
            <div className="flex items-center space-x-3">
              <Shield className="h-6 w-6 text-primary" />
              <span className="text-gray-600">Bank-level security</span>
            </div>
            <div className="flex items-center space-x-3">
              <Zap className="h-6 w-6 text-primary" />
              <span className="text-gray-600">5+ hours saved monthly</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
