import { Metadata } from 'next';
import Header from './components/Header';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import FAQsSection from '@/components/FAQsSection';
import FinancialCalculator from '@/components/FinancialCalculator';
import HowItWorksSection from './components/HowItWorksSection';

export const metadata: Metadata = {
  title: 'StackZen.app | AI Financial Automation for Tradespeople',
  description:
    'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation built specifically for tradespeople, side hustlers, freelancers, and 9-5 rebuilders. Automate income, eliminate hidden fees, and grow your wealth.',
  metadataBase: new URL('https://stackzen.app'),
  openGraph: {
    title: 'StackZen.app | AI Financial Automation for Tradespeople',
    description:
      'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation for tradespeople and side hustlers.',
    url: 'https://stackzen.app',
    siteName: 'StackZen.app',
    type: 'website',
  },
  twitter: {
    title: 'StackZen.app | AI Financial Automation for Tradespeople',
    description:
      'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation for tradespeople and side hustlers.',
    card: 'summary_large_image',
  },
};

export default function Home() {
  const waitlistUrl = 'https://tally.so/r/3NO0eG';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-neutral-light/30 to-secondary/5">
      <Header waitlistUrl={waitlistUrl} />
      <main className="flex min-h-screen flex-col items-center justify-between">
        <HeroSection waitlistUrl={waitlistUrl} />
        <HowItWorksSection />
        <FeaturesSection />
        <TestimonialsSection />
        <FinancialCalculator />
        <FAQsSection />
        <CTASection />
      </main>
    </div>
  );
}
