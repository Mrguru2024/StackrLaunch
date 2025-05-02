'use client';

import { motion } from 'framer-motion';
import { Brain, PiggyBank, Shield, Zap, TrendingUp, Clock, BarChart3, Wallet } from 'lucide-react';
import { useScrollReveal } from '@/hooks/use-scroll-reveal';

const features = [
  {
    title: 'AI-Powered Automation',
    description:
      'Our AI analyzes your income patterns and automatically allocates funds for bills, savings, and investments.',
    icon: Brain,
  },
  {
    title: 'Smart Savings',
    description:
      'Automatically save money during high-income periods to cover expenses during slower times.',
    icon: PiggyBank,
  },
  {
    title: 'Bank-Level Security',
    description: '256-bit encryption and secure, read-only connections to your financial accounts.',
    icon: Shield,
  },
  {
    title: 'Time Saving',
    description: 'Save 5+ hours monthly by automating financial tasks and eliminating manual work.',
    icon: Clock,
  },
  {
    title: 'Hidden Fee Detection',
    description: 'Automatically identify and eliminate unnecessary fees and subscriptions.',
    icon: BarChart3,
  },
  {
    title: 'Smart Investments',
    description: 'Automated investment strategies tailored to your financial goals.',
    icon: TrendingUp,
  },
  {
    title: 'Expense Tracking',
    description: 'Real-time tracking of business and personal expenses with smart categorization.',
    icon: Wallet,
  },
  {
    title: 'Instant Insights',
    description: 'Get real-time insights into your financial health and growth opportunities.',
    icon: Zap,
  },
];

export default function FeaturesSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything You Need to
            <span className="text-primary"> Automate Your Finances</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            StackZen combines powerful AI with intuitive design to give you complete control over
            your finances, even with variable income.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <feature.icon className="h-8 w-8 text-primary mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
