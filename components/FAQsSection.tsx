'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

const faqs = [
  {
    question: 'How does StackZen handle variable income?',
    answer:
      'StackZen uses AI to analyze your income patterns and automatically allocates funds for bills, savings, and investments. During high-income periods, it saves more to cover expenses during slower times.',
  },
  {
    question: 'Is my financial data secure?',
    answer:
      'Yes, we use bank-level 256-bit encryption and secure, read-only connections to your financial accounts. Your data is never shared with third parties without your explicit consent.',
  },
  {
    question: 'How much can I save with StackZen?',
    answer:
      'On average, StackZen users save $650 per year through automated fee detection, subscription management, and smart financial optimization. The exact amount varies based on your financial situation.',
  },
  {
    question: 'What makes StackZen different from other financial apps?',
    answer:
      'StackZen is specifically designed for variable income earners. Our AI understands the unique challenges of irregular income and automatically adjusts your financial strategy to ensure stability and growth.',
  },
  {
    question: 'How long does it take to set up StackZen?',
    answer:
      'Setting up StackZen takes less than 5 minutes. Simply connect your financial accounts, and our AI will start analyzing your patterns and creating a personalized financial strategy.',
  },
];

export default function FAQsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to know about StackZen and how it can help you manage your variable
            income
          </motion.h2>
          <motion.p
            className="text-xl text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Everything you need to know about StackZen and how it can help you manage your variable
            income.
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-lg font-semibold">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
