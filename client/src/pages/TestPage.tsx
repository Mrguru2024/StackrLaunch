import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function TestPage() {
  // Tally.so waitlist form URL (using the same as Home)
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  const { toast } = useToast();
  
  const showTestToast = () => {
    toast({
      variant: "default",
      title: "Test Successful!",
      description: "This is a test toast notification.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header waitlistUrl={waitlistUrl} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Test Page
          </h1>
          
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            This is a simple test page to verify routing and toast functionality.
          </p>
          
          <div className="flex justify-center">
            <Button onClick={showTestToast}>
              Show Test Toast
            </Button>
          </div>
        </div>
      </main>
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}