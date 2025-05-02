'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

export default function TestimonialsSection() {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Why Early Users Love StackZen
          </h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Here's what our beta testers are saying about how StackZen has transformed their
            financial lives.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Testimonial 1 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="inline-block w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-gray-700 mb-6">
              "As an electrician with irregular income, StackZen has been a game-changer. I've saved
              over $4,200 in six months without even thinking about it."
            </blockquote>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">Michael T.</p>
                <p className="text-sm text-gray-500">Independent Electrician</p>
              </div>
            </div>
          </div>

          {/* Testimonial 2 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="text-primary">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="inline-block w-5 h-5 fill-current" />
                ))}
              </div>
            </div>

            <blockquote className="text-gray-700 mb-6">
              "StackZen found $175 in monthly subscriptions I'd forgotten about and helped me set up
              a tax savings plan that's already saved me thousands."
            </blockquote>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">Sarah L.</p>
                <p className="text-sm text-gray-500">E-commerce Side Hustler</p>
              </div>
            </div>
          </div>

          {/* Testimonial 3 */}
          <div className="bg-white rounded-xl shadow-lg p-8 border border-gray-100">
            <div className="flex items-center mb-6">
              <div className="text-primary">
                {[...Array(4)].map((_, i) => (
                  <Star key={i} className="inline-block w-5 h-5 fill-current" />
                ))}
                <Star className="inline-block w-5 h-5 fill-current text-primary/50" />
              </div>
            </div>

            <blockquote className="text-gray-700 mb-6">
              "After 15 years in construction, I've never felt more confident about my finances. The
              automated saving rules are perfect for my irregular paychecks."
            </blockquote>

            <div className="flex items-center">
              <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-gray-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <p className="font-bold text-gray-900">James D.</p>
                <p className="text-sm text-gray-500">Construction Worker</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="mt-20 bg-gray-50 rounded-2xl shadow-inner p-8 md:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">The Numbers Don't Lie</h3>
            <p className="mt-3 text-gray-600">
              Early results from our beta program show real financial impact.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {/* Stat 1 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">$540</p>
              <p className="mt-2 text-lg text-gray-700">Average monthly savings</p>
            </div>

            {/* Stat 2 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">94%</p>
              <p className="mt-2 text-lg text-gray-700">User retention rate</p>
            </div>

            {/* Stat 3 */}
            <div>
              <p className="text-4xl md:text-5xl font-bold text-primary">15x</p>
              <p className="mt-2 text-lg text-gray-700">ROI on subscription cost</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
