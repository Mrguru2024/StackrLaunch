'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import Script from 'next/script';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

interface FAQItem {
  question: string;
  answer: string;
  targetPersona: 'tradesperson' | 'side-hustler' | '9-5-rebuilder' | 'general';
}

export default function FAQsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs: FAQItem[] = [
    {
      question: 'How does Stackr help tradespeople manage variable income?',
      answer:
        'Stackr uses AI to analyze your income patterns and automatically allocates funds for bills, savings, and taxes. For tradespeople with seasonal or project-based income, Stackr creates smart buffers during high-income periods to cover expenses during slower times, ensuring financial stability year-round without manual calculations.',
      targetPersona: 'tradesperson',
    },
    {
      question: 'Can Stackr help me track deductible expenses for my side hustle?',
      answer:
        'Yes! Stackr automatically categorizes and tracks business expenses that may be tax-deductible for your side hustle. The platform distinguishes between personal and business transactions, providing real-time tracking of potential deductions and generating expense reports that make tax filing easier and more accurate.',
      targetPersona: 'side-hustler',
    },
    {
      question: 'How will Stackr save me time on financial management?',
      answer:
        'Stackr saves users an average of 5+ hours per month by automating income allocation, bill payments, and expense categorization. Our AI handles the complex work of financial optimization, eliminating the need for manual spreadsheets, budget adjustments, or subscription tracking. Simply connect your accounts once, and Stackr handles the rest.',
      targetPersona: 'general',
    },
    {
      question: 'What makes Stackr different from other financial apps?',
      answer:
        'Unlike generic financial apps, Stackr is specifically built for people with variable incomes like tradespeople, side hustlers, and 9-5 rebuilders. Our AI adapts to your unique income patterns rather than assuming a steady paycheck. Stackr also provides proactive financial optimization – not just tracking, but actually improving your finances by detecting hidden fees, unused subscriptions, and growth opportunities.',
      targetPersona: 'general',
    },
    {
      question: 'Is Stackr secure? How do you protect my financial data?',
      answer:
        'Stackr employs bank-level encryption (256-bit AES) and secure, read-only connections to your financial accounts. We never store your banking credentials, use multi-factor authentication, and conduct regular security audits. Stackr is built on the same security infrastructure used by major financial institutions, ensuring your sensitive data remains protected.',
      targetPersona: 'general',
    },
    {
      question: 'How does Stackr help me save money while rebuilding my career?',
      answer:
        'For 9-5 rebuilders transitioning careers, Stackr provides intelligent expense reduction by identifying unnecessary spending and subscriptions. Our AI recommends personalized savings strategies based on your current situation and automatically adjusts your financial plan during income changes. Stackr users save an average of $650/year through fee detection and spending optimization.',
      targetPersona: '9-5-rebuilder',
    },
    {
      question: 'When will Stackr be available, and how much will it cost?',
      answer:
        "We're currently finalizing our platform with early access planned for summer 2025. Join our waitlist to be among the first users. Stackr will offer a free basic plan for essential features, with premium features available through a subscription. Early waitlist members will receive special pricing and extended access to premium features.",
      targetPersona: 'general',
    },
  ];

  const faqStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section id="faqs" className="py-16 md:py-24 px-4 bg-background">
      <Script
        id="faq-structured-data"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqStructuredData) }}
      />
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12" itemScope itemType="https://schema.org/FAQPage">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-muted-foreground">
            Everything you need to know about Stackr financial automation
          </p>

          <div className="mt-10 space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-border rounded-lg overflow-hidden bg-card"
                itemScope
                itemType="https://schema.org/Question"
                itemProp="mainEntity"
              >
                <button
                  className="flex justify-between items-center w-full p-5 text-left hover:bg-accent/5 transition-colors"
                  onClick={() => toggleFAQ(index)}
                  aria-expanded={openIndex === index}
                  aria-controls={`faq-answer-${index}`}
                >
                  <h3 className="text-lg font-semibold text-foreground" itemProp="name">
                    {faq.question}
                  </h3>
                  <ChevronDown
                    className={`w-5 h-5 text-muted-foreground transition-transform ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                <div
                  id={`faq-answer-${index}`}
                  className={`overflow-hidden transition-all duration-300 ${
                    openIndex === index ? 'max-h-96' : 'max-h-0'
                  }`}
                  itemScope
                  itemType="https://schema.org/Answer"
                  itemProp="acceptedAnswer"
                >
                  <div className="p-5 border-t border-border bg-accent/5">
                    <p className="text-muted-foreground" itemProp="text">
                      {faq.answer}
                    </p>

                    {/* Hidden SEO metadata */}
                    <meta itemProp="audience" content={faq.targetPersona} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="mt-12 text-center p-6 bg-background rounded-xl shadow-sm border border-border"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-bold text-foreground mb-2">Have more questions?</h3>
          <p className="text-muted-foreground mb-4">
            Join our waitlist to get updates and ask specific questions about how Stackr can help
            with your financial needs.
          </p>
          <button
            className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-primary-foreground bg-primary rounded-md shadow-sm hover:bg-primary/90 transition-colors"
            data-tally-open="3NO0eG"
            data-tally-width="500"
            data-tally-emoji-text="💬"
            data-tally-emoji-animation="wave"
          >
            Get Early Access & Ask Questions
          </button>
        </motion.div>
      </div>
    </section>
  );
}
