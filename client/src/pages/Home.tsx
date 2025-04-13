import { useEffect } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import SecuritySection from "@/components/SecuritySection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FinancialCalculator from "@/components/FinancialCalculator";
import FAQsSection from "@/components/FAQsSection";
import CTASection from "@/components/CTASection";
import ShareLinks from "@/components/ShareLinks";
import Footer from "@/components/Footer";

export default function Home() {
  // Tally.so waitlist form URL
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  
  // Add structured product data for SEO
  useEffect(() => {
    // Add structured data for Product
    const productData = {
      "@context": "https://schema.org/",
      "@type": "SoftwareApplication",
      "name": "Stackr Financial Automation",
      "applicationCategory": "FinanceApplication",
      "operatingSystem": "Web, iOS, Android",
      "description": "AI-powered financial automation platform that saves tradespeople and side hustlers $650/year and 5+ hours monthly by automating income allocation, detecting hidden fees, and optimizing finances.",
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "4.8",
        "ratingCount": "131",
        "bestRating": "5"
      },
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
        "availability": "https://schema.org/PreOrder"
      }
    };

    // Create and append the schema script
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(productData);
    document.head.appendChild(script);

    // Cleanup on unmount
    return () => {
      document.head.removeChild(script);
    };
  }, []);
  
  return (
    <div className="min-h-screen flex flex-col" itemScope itemType="https://schema.org/WebPage">
      <Header waitlistUrl={waitlistUrl} />
      <main id="main-content">
        {/* Semantic sections with structured markup for SEO */}
        <section aria-labelledby="hero-heading" itemScope itemType="https://schema.org/WPHeader">
          <HeroSection waitlistUrl={waitlistUrl} />
        </section>
        
        <section aria-labelledby="benefits-heading" id="benefits" itemScope itemType="https://schema.org/ItemList">
          <meta itemProp="numberOfItems" content="5" />
          <meta itemProp="name" content="Stackr Financial Benefits" />
          <BenefitsSection waitlistUrl={waitlistUrl} />
        </section>
        
        <section aria-labelledby="how-it-works-heading" id="how-it-works" itemScope itemType="https://schema.org/HowTo">
          <meta itemProp="totalTime" content="PT5M" />
          <meta itemProp="name" content="How Stackr Financial Automation Works" />
          <HowItWorksSection />
        </section>
        
        <section aria-labelledby="calculator-heading" id="calculator" itemScope itemType="https://schema.org/InteractiveWeb">
          <meta itemProp="name" content="Stackr Financial Savings Calculator" />
          <FinancialCalculator />
        </section>
        
        <section aria-labelledby="security-heading" id="security" itemScope itemType="https://schema.org/Thing">
          <meta itemProp="name" content="Stackr Financial Security Features" />
          <SecuritySection />
        </section>
        
        <section aria-labelledby="testimonials-heading" id="testimonials" itemScope itemType="https://schema.org/Review">
          <meta itemProp="name" content="Stackr User Testimonials" />
          <TestimonialsSection />
        </section>
        
        <section aria-labelledby="faqs-heading" id="faqs" itemScope itemType="https://schema.org/FAQPage">
          <meta itemProp="name" content="Stackr Financial FAQ for Tradespeople & Side Hustlers" />
          <FAQsSection />
        </section>
        
        <section aria-labelledby="cta-heading" id="waitlist" itemScope itemType="https://schema.org/Action">
          <meta itemProp="name" content="Join Stackr Financial Waitlist" />
          <CTASection waitlistUrl={waitlistUrl} />
        </section>
        
        <section className="bg-gray-900 py-8 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-4">Connect with Stackr</h2>
            <p className="text-gray-300 mb-6">Follow us on social media for updates on our launch, financial tips, and more.</p>
            <ShareLinks />
          </div>
        </section>
      </main>
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}
