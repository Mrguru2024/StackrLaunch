import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  // Tally.so waitlist form URL
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header waitlistUrl={waitlistUrl} />
      <main>
        <HeroSection waitlistUrl={waitlistUrl} />
        <BenefitsSection waitlistUrl={waitlistUrl} />
        <HowItWorksSection />
        <TestimonialsSection />
        <CTASection waitlistUrl={waitlistUrl} />
      </main>
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}
