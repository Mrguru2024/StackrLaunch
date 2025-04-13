import React from "react";
import Header from "@/components/Header";
import { ToastShowcase } from "@/components/ToastShowcase";
import Footer from "@/components/Footer";

export default function ToastDemo() {
  // Tally.so waitlist form URL (using the same as Home)
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header waitlistUrl={waitlistUrl} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Stackr Toast Notification System
          </h1>
          
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Playful toast notifications with character for enhanced user engagement. 
            These toasts feature brand colors, animations, and contextual icons.
          </p>
          
          <ToastShowcase />
          
          <div className="mt-12 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-4">Implementation Details</h2>
            <p className="text-gray-600 mb-4">
              The toast system uses custom variants that align with Stackr's brand colors and messaging:
            </p>
            
            <ul className="list-disc pl-6 mb-6 space-y-2 text-gray-600">
              <li><strong>Money</strong> - Green-themed toast for financial updates and transaction notifications</li>
              <li><strong>Tip</strong> - Purple-themed toast for helpful tips and suggestions</li>
              <li><strong>Celebration</strong> - Indigo-themed toast for achievements and milestones</li>
              <li><strong>AI</strong> - Blue-themed toast for AI-powered insights and recommendations</li>
            </ul>
            
            <p className="text-gray-600 mb-4">
              Each toast type includes:
            </p>
            
            <ul className="list-disc pl-6 space-y-2 text-gray-600">
              <li>Custom styling with gradient backgrounds</li>
              <li>Contextual icons that match the message type</li>
              <li>Optional animations (bounce, wiggle, tada, etc.)</li>
              <li>Configurable duration</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}