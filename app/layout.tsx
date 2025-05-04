import { Inter } from 'next/font/google';
import { ThemeProvider } from '../components/theme-provider';
import { Toaster } from '../components/ui/toaster';
import { QueryProvider } from '../components/providers/query-client-provider';
import './globals.css';
import Script from 'next/script';
import type { Metadata } from 'next';
import { ThemeToggle } from '../components/theme-toggle';
import AnimatedLogo from './components/AnimatedLogo';
import { Analytics } from '@vercel/analytics/react';

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
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        rel: 'android-chrome-512x512',
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://stackzen.app',
    siteName: 'StackZen',
    title: 'StackZen - AI Financial Automation for Tradespeople & Side Hustlers',
    description:
      'StackZen helps tradespeople, side hustlers, and 9-5 rebuilders automate income, eliminate hidden fees, and grow wealth without spreadsheets or bookkeeping.',
    images: [
      {
        url: '/StackZenOriginalLogo.svg',
        width: 1200,
        height: 630,
        alt: 'StackZen Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'StackZen - AI Financial Automation for Tradespeople & Side Hustlers',
    description:
      'StackZen helps tradespeople, side hustlers, and 9-5 rebuilders automate income, eliminate hidden fees, and grow wealth without spreadsheets or bookkeeping.',
    creator: '@stackzen',
    site: '@stackzen',
    images: ['/StackZenOriginalLogo.svg'],
  },
  alternates: {
    canonical: 'https://stackzen.app',
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
        <Script src="https://tally.so/widgets/embed.js" strategy="lazyOnload" async />
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
      <body className={`${inter.className} flex h-full flex-col antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <QueryProvider>
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
            <AnimatedLogo />
            <main className="flex-1 w-full">{children}</main>
            <Toaster />
            <Analytics />
          </QueryProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
