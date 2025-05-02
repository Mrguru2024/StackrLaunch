import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import { QueryClientProvider } from '@/components/providers/query-client-provider';
import { ThemeToggle } from '@/components/theme-toggle';
import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://stackzen.app'),
  title: 'StackZen - AI Financial Automation for Variable Income',
  description:
    'StackZen helps tradespeople, side hustlers, and 9-5 rebuilders automate income, eliminate hidden fees, and grow wealth without spreadsheets or bookkeeping.',
  keywords: [
    'financial automation',
    'AI finance',
    'variable income',
    'personal finance',
    'money management',
  ],
  authors: [{ name: 'StackZen Team' }],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'StackZen - AI Financial Automation for Variable Income',
    description:
      'StackZen helps tradespeople, side hustlers, and 9-5 rebuilders automate income, eliminate hidden fees, and grow wealth without spreadsheets or bookkeeping.',
    siteName: 'StackZen',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'StackZen - AI Financial Automation',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackZen - AI Financial Automation for Variable Income',
    description:
      'StackZen helps tradespeople, side hustlers, and 9-5 rebuilders automate income, eliminate hidden fees, and grow wealth without spreadsheets or bookkeeping.',
    images: ['/og-image.png'],
    creator: '@stackzen',
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full">
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
      <body className={`${inter.className} flex h-full flex-col bg-background antialiased`}>
        <QueryClientProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <main className="flex-1 w-full">{children}</main>
            <Toaster />
          </ThemeProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
