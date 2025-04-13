import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CheckCircle2 } from "lucide-react";

// Simple Toast Component
const Toast = ({ message, onClose }: { message: string; onClose: () => void }) => {
  return (
    <div 
      className="fixed top-4 right-4 z-50 bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow-lg"
      style={{
        animation: 'slideIn 0.5s ease-out forwards',
        minWidth: '250px',
        maxWidth: '350px'
      }}
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <CheckCircle2 className="text-green-500 mr-2" size={20} />
          <span>{message}</span>
        </div>
        <button 
          onClick={onClose}
          className="text-green-500 hover:text-green-700 ml-4"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

// A completely self-contained toast implementation
const DirectToast = () => {
  const [showToast, setShowToast] = useState(false);

  const displayToast = () => {
    setShowToast(true);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
          onClick={displayToast}
        >
          Show Direct Toast
        </button>
      </div>

      {/* Render toast when showToast is true */}
      {showToast && (
        <Toast 
          message="This is a direct test toast!" 
          onClose={() => setShowToast(false)} 
        />
      )}
      
      {/* No inline styles needed - using global CSS */}
    </>
  );
};

export default function DirectToastTest() {
  // Tally.so waitlist form URL
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header waitlistUrl={waitlistUrl} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Direct Toast Test
          </h1>
          
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            This is a simple test page with a direct, self-contained toast implementation.
          </p>
          
          <DirectToast />
        </div>
      </main>
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}