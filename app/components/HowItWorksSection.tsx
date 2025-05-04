'use client';

import { motion } from 'framer-motion';
import { Calculator, CreditCard, TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';

const features = [
  {
    title: 'Smart Credit Card Management',
    description:
      'Automatically track and optimize your credit card usage to maximize rewards and minimize interest.',
    icon: CreditCard,
    color: 'text-[#233D4D]',
  },
  {
    title: 'Real-time Financial Insights',
    description:
      'Get instant visibility into your spending patterns and financial health with our AI-powered analytics.',
    icon: BarChart3,
    color: 'text-[#00C6A7]',
  },
  {
    title: 'Automated Bill Payments',
    description:
      'Never miss a payment with our intelligent bill tracking and automated payment scheduling system.',
    icon: Calculator,
    color: 'text-[#F4A300]',
  },
  {
    title: 'Investment Portfolio Tracking',
    description:
      'Monitor your investments and get personalized recommendations to optimize your portfolio.',
    icon: TrendingUp,
    color: 'text-[#58C1E2]',
  },
  {
    title: 'Secure Financial Data',
    description: 'Bank-level security ensures your financial data is always protected and private.',
    icon: Shield,
    color: 'text-[#233D4D]',
  },
  {
    title: 'Instant Financial Decisions',
    description:
      'Make informed financial decisions quickly with our real-time analysis and recommendations.',
    icon: Zap,
    color: 'text-[#00C6A7]',
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

export default function HowItWorksSection() {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How StackZen Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-200 max-w-2xl mx-auto">
            Our AI-powered platform helps you manage your finances smarter, not harder.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${feature.color} mb-6`}>
                <feature.icon className="w-full h-full" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
