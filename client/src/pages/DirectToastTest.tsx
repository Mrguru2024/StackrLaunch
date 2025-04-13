import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// We're completely simplifying this by putting all logic in the main component
export default function DirectToastTest() {
  // Tally.so waitlist form URL
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  const [showToast, setShowToast] = useState(false);
  
  const handleShowToast = () => {
    setShowToast(true);
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setShowToast(false);
    }, 5000);
  };
  
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
          
          <div className="flex justify-center mb-8">
            <button
              className="bg-purple-600 hover:bg-purple-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={handleShowToast}
            >
              Show Direct Toast
            </button>
          </div>
        </div>
      </main>
      
      {/* Simple inline toast with no dependencies */}
      {showToast && (
        <div className="fixed top-4 right-4 z-50 bg-purple-100 border-l-4 border-purple-500 text-purple-800 p-4 rounded shadow-lg animate-slideIn">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <svg className="text-purple-500 w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
              <span>This is a direct test toast!</span>
            </div>
            <button 
              onClick={() => setShowToast(false)} 
              className="text-purple-500 hover:text-purple-700 ml-4"
            >
              ✕
            </button>
          </div>
        </div>
      )}
      
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}