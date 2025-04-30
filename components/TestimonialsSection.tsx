'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const testimonials = [
  {
    quote:
      "StackZen has completely transformed how I manage my finances as a contractor. The AI automation saves me hours every month, and I've already saved over $500 in hidden fees!",
    author: 'Sarah M.',
    role: 'Independent Contractor',
    rating: 5,
  },
  {
    quote:
      'As someone with multiple income streams, StackZen has been a game-changer. It automatically handles my variable income and ensures I never miss a bill or savings goal.',
    author: 'Michael T.',
    role: 'Side Hustler',
    rating: 5,
  },
  {
    quote:
      "I was skeptical about financial automation, but StackZen's AI is incredibly smart. It's like having a personal financial advisor that works 24/7 to optimize my money.",
    author: 'David R.',
    role: 'Freelance Developer',
    rating: 5,
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Loved by People Like You
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Join thousands of variable income earners who trust StackZen to manage their finances.
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "StackZen has completely transformed how I manage my finances as a contractor. The AI
              automation saves me hours every month, and I've already saved over $500 in hidden
              fees!"
            </p>
            <p className="font-semibold">- Sarah M., Electrician</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              'As someone with multiple income streams, StackZen has been a game-changer. It
              automatically handles my variable income and ensures I never miss a bill or savings
              goal.'
            </p>
            <p className="font-semibold">- Michael T., Freelance Developer</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-gray-600 mb-4">
              "I was skeptical about financial automation, but StackZen's AI is incredibly smart.
              It's like having a personal financial advisor that works 24/7 to optimize my money."
            </p>
            <p className="font-semibold">- Lisa R., Small Business Owner</p>
          </div>
        </motion.div>

        <motion.p
          className="text-xl text-gray-600 mt-8 max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Join thousands of variable income earners who trust StackZen to manage their finances.
        </motion.p>
      </div>
    </section>
  );
}
