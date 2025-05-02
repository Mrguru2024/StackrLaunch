'use client';

import { motion } from 'framer-motion';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Sparkles, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

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
          <motion.div
            className="inline-flex items-center justify-center mb-4"
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Sparkles className="h-6 w-6 text-[#00C6A7] mr-2" />
            <span className="text-[#00C6A7] font-semibold">Frequently Asked Questions</span>
          </motion.div>

          <motion.h2
            className="text-3xl md:text-4xl font-bold text-[#233D4D] mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            Everything you need to know about <span className="text-[#00C6A7]">StackZen</span>
          </motion.h2>

          <motion.p
            className="text-xl text-[#58C1E2] max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Get answers to common questions about how StackZen can help you manage your variable
            income and achieve financial stability.
          </motion.p>
        </div>

        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border border-[#E5E9F0] rounded-lg overflow-hidden"
              >
                <AccordionTrigger className="text-left text-lg font-semibold bg-[#00C6A7] text-white px-6 py-4 hover:bg-[#233D4D] transition-colors duration-200 hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="bg-white text-[#58C1E2] px-6 py-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="inline-flex items-center justify-center mb-4">
            <MessageCircle className="h-6 w-6 text-[#00C6A7] mr-2" />
            <span className="text-[#00C6A7] font-semibold">Still have questions?</span>
          </div>
          <p className="text-[#58C1E2] mb-6">
            Our team is here to help you get the most out of StackZen
          </p>
          <Button
            size="lg"
            className="text-lg px-8 py-6 bg-[#00C6A7] hover:bg-[#233D4D] text-white transition-colors duration-200"
            data-tally-open="3NO0eG"
            data-tally-emoji-text="👋"
            data-tally-emoji-animation="wave"
            data-tally-auto-close="0"
            data-tally-layout="modal"
            data-tally-width="700"
          >
            Contact Support
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
