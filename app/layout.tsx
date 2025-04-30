import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import '@/styles/globals.css';
import Script from 'next/script';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'StackZen | AI Financial Automation for Tradespeople & Side Hustlers',
  description:
    "Save $650/year & 5+ hours monthly with StackZen's AI financial automation built specifically for tradespeople, side hustlers, freelancers, and 9-5 rebuilders. Automate income, eliminate hidden fees, and grow your wealth.",
  keywords:
    'financial automation, money management app, side hustle finance, tradesperson budgeting, income automation, AI financial assistant, variable income management, freelancer finances, contractor money management, hidden fee detection, subscription tracker, financial growth, wealth building, budget automation, self-employed finances, financial planning, Atlanta fintech',
  authors: [{ name: 'StackZen Financial, Inc.' }],
  creator: 'StackZen Team',
  publisher: 'StackZen Financial, Inc.',
  robots: 'index, follow',
  alternates: {
    canonical: 'https://stackzen.tech',
  },
  openGraph: {
    type: 'website',
    url: 'https://stackzen.tech',
    title: 'StackZen | Smart Money Management for Tradespeople & Side Hustlers',
    description:
      'AI-powered financial automation that saves you $650/year & 5+ hours monthly. Built for variable incomes, freelancers, and contractors. Join 131+ early adopters!',
    images: [
      {
        url: 'https://stackzen.tech/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'StackZen Financial Automation Platform',
      },
    ],
    locale: 'en_US',
    siteName: 'StackZen Financial',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackZen | Financial Automation for Variable Incomes',
    description:
      'Smart money management that actually works for tradespeople, side hustlers, and people with variable income. Save time & money automatically.',
    images: ['https://stackzen.tech/twitter-image.jpg'],
    creator: '@stackzenfinancial',
    site: '@stackzenfinancial',
  },
  other: {
    subject: 'Financial Automation Platform',
    classification: 'Business, Finance, Technology',
    language: 'EN',
    coverage: 'Worldwide',
    distribution: 'Global',
    category: 'Technology',
    rating: 'General',
    'revisit-after': '7 days',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script src="https://tally.so/widgets/embed.js" strategy="afterInteractive" />
        <Script
          id="schema-organization"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'StackZen Financial',
              url: 'https://stackzen.tech',
              logo: 'https://stackzen.tech/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-0123',
                contactType: 'customer service',
                email: 'support@stackzen.tech',
              },
              sameAs: [
                'https://twitter.com/stackzenfinancial',
                'https://www.linkedin.com/company/stackzen-financial',
                'https://www.instagram.com/stackzenfinancial',
              ],
            }),
          }}
        />
        <Script
          id="schema-website"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              url: 'https://stackzen.tech',
              name: 'StackZen Financial Automation',
              description: 'AI-powered financial automation for people with variable incomes',
              potentialAction: {
                '@type': 'Action',
                target: 'https://stackzen.tech/#waitlist',
                name: 'Join Waitlist',
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'StackZen',
              url: 'https://stackzen.tech',
              logo: 'https://stackzen.tech/logo.png',
              sameAs: [
                'https://twitter.com/stackzenfinancial',
                'https://linkedin.com/company/stackzen-financial',
              ],
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+1-555-0123',
                contactType: 'customer service',
                email: 'support@stackzen.tech',
                availableLanguage: ['English'],
              },
            }),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Product',
              name: 'StackZen Financial Automation Platform',
              image: 'https://stackzen.tech/og-image.jpg',
              description:
                'AI-powered financial automation platform for tradespeople, side hustlers, and 9-5 rebuilders.',
              brand: {
                '@type': 'Brand',
                name: 'StackZen',
              },
              offers: {
                '@type': 'Offer',
                availability: 'https://schema.org/PreOrder',
                price: '0',
                priceCurrency: 'USD',
                url: 'https://stackzen.tech',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '4.9',
                reviewCount: '131',
              },
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
