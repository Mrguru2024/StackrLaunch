import { Metadata } from 'next';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import TestimonialsSection from './components/TestimonialsSection';
import CTASection from './components/CTASection';
import FAQsSection from './components/FAQsSection';
import FinancialCalculator from './components/FinancialCalculator';
import HowItWorksSection from './components/HowItWorksSection';
import { sanity } from '@/lib/sanity';
import BlogSection from './components/BlogSection';

export const metadata: Metadata = {
  metadataBase: new URL('https://stackzen.app'),
  title: {
    default: 'StackZen.app | AI Financial Automation for Tradespeople',
    template: '%s | StackZen.app',
  },
  description:
    'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation built specifically for tradespeople, side hustlers, freelancers, and 9-5 rebuilders. Automate income, eliminate hidden fees, and grow your wealth.',
  keywords: [
    'financial automation',
    'tradespeople',
    'side hustlers',
    'freelancers',
    'AI finance',
    'wealth management',
    'financial tools',
    'automation software',
  ],
  authors: [{ name: 'StackZen Team' }],
  creator: 'StackZen',
  publisher: 'StackZen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stackzen.app',
    siteName: 'StackZen.app',
    title: 'StackZen.app | AI Financial Automation for Tradespeople',
    description:
      'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation for tradespeople and side hustlers.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StackZen.app - AI Financial Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackZen.app | AI Financial Automation for Tradespeople',
    description:
      'Save $650/year & 5+ hours monthly with StackZen.app - AI financial automation for tradespeople and side hustlers.',
    creator: '@stackzen',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-site-verification',
    yandex: 'your-yandex-verification',
    yahoo: 'your-yahoo-verification',
  },
  alternates: {
    canonical: 'https://stackzen.app',
  },
};

async function getLatestPosts() {
  try {
    const posts = await sanity.fetch(
      `*[_type == "post" && status == "published"] | order(publishedAt desc)[0...3] {
        title,
        slug,
        excerpt,
        publishedAt,
        author->{
          name,
          image
        }
      }`
    );
    return posts;
  } catch (error) {
    console.error('Error fetching latest posts:', error);
    return [];
  }
}

export default async function Home() {
  const latestPosts = await getLatestPosts();

  return (
    <>
      <div className="fixed inset-0 bg-gradient-to-br from-white via-[#F5F7FA] to-[#00C6A7]/5 -z-10" />
      <div className="relative">
        <main>
          <HeroSection />
          <HowItWorksSection />
          <FeaturesSection />
          <TestimonialsSection />
          <FinancialCalculator />
          <FAQsSection />
          <BlogSection posts={latestPosts} />
          <CTASection waitlistUrl="https://tally.so/r/3NO0eG" />
        </main>
      </div>
    </>
  );
}
