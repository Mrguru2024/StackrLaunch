import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";

export default function Home() {
  // Waitlist URL - in a real application this would come from an environment variable
  const waitlistUrl = "https://tally.so/waitlist"; // Replace with actual Tally URL

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
