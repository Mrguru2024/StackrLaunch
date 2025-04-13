import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// A completely self-contained toast implementation
const DirectToast = () => {
  const [toasts, setToasts] = useState<Array<{id: string, message: string}>>([]);

  const addToast = (message: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts(prev => [...prev, { id, message }]);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 5000);
  };

  return (
    <>
      <div className="flex flex-col items-center mt-8">
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-medium"
          onClick={() => addToast("This is a direct test toast!")}
        >
          Show Direct Toast
        </button>
      </div>

      {/* Toast container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
        {toasts.map(toast => (
          <div 
            key={toast.id}
            className="bg-green-100 border-l-4 border-green-500 text-green-800 p-4 rounded shadow-lg animate-slide"
            style={{animationDuration: '0.3s'}}
          >
            <div className="flex items-center">
              <div className="ml-3">{toast.message}</div>
              <button 
                className="ml-4 text-green-500 hover:text-green-700"
                onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>
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