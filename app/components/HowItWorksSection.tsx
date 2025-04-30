'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Clock, BarChart } from 'lucide-react';

const steps = [
  {
    icon: Shield,
    title: 'Secure Connection',
    description:
      'Connect your financial accounts with bank-level encryption. Your data is always protected.',
    color: 'text-primary',
  },
  {
    icon: Zap,
    title: 'AI Analysis',
    description:
      'Our AI automatically analyzes your transactions to identify hidden fees and savings opportunities.',
    color: 'text-secondary',
  },
  {
    icon: Clock,
    title: 'Time Savings',
    description:
      'Automate your financial tracking and save 5+ hours monthly on manual bookkeeping.',
    color: 'text-highlight',
  },
  {
    icon: BarChart,
    title: 'Wealth Growth',
    description:
      'Get personalized insights to optimize your income and grow your wealth over time.',
    color: 'text-accent',
  },
];

export default function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      className="py-24 bg-gradient-to-br from-white via-neutral-light/30 to-secondary/5"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-foreground mb-4"
          >
            How StackZen Works
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-3xl mx-auto"
          >
            Four simple steps to automate your finances and grow your wealth
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className={`${step.color} mb-4`}>
                  <step.icon className="w-12 h-12" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                  <ArrowRight className="w-8 h-8 text-muted-foreground" />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-primary rounded-full opacity-5 blur-3xl -z-10"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 bg-secondary rounded-full opacity-5 blur-3xl -z-10"></div>
      </div>
    </section>
  );
}
