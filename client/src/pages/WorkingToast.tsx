import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// Simple self-contained toast component
const Toast = ({ 
  message, 
  type = 'success', 
  onClose 
}: { 
  message: string; 
  type?: 'success' | 'error' | 'warning' | 'info'; 
  onClose: () => void;
}) => {
  // Config for different toast types
  const styles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-800',
      iconColor: 'text-green-500',
      closeColor: 'text-green-500 hover:text-green-700'
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-800',
      iconColor: 'text-red-500',
      closeColor: 'text-red-500 hover:text-red-700'
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      iconColor: 'text-yellow-500',
      closeColor: 'text-yellow-500 hover:text-yellow-700'
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-800',
      iconColor: 'text-blue-500',
      closeColor: 'text-blue-500 hover:text-blue-700'
    }
  };
  
  const currentStyle = styles[type];
  
  // Different icons for different toast types
  const icons = {
    success: (
      <svg className={`w-5 h-5 mr-2 ${currentStyle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    error: (
      <svg className={`w-5 h-5 mr-2 ${currentStyle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    ),
    warning: (
      <svg className={`w-5 h-5 mr-2 ${currentStyle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
      </svg>
    ),
    info: (
      <svg className={`w-5 h-5 mr-2 ${currentStyle.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    )
  };

  return (
    <div 
      className={`fixed top-4 right-4 z-50 ${currentStyle.bg} border-l-4 ${currentStyle.border} ${currentStyle.text} p-4 rounded shadow-lg animate-slideIn max-w-sm`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {icons[type]}
          <span>{message}</span>
        </div>
        <button 
          onClick={onClose}
          className={currentStyle.closeColor}
          aria-label="Close"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default function WorkingToast() {
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  const [activeToast, setActiveToast] = useState<{
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  
  const showToast = (type: 'success' | 'error' | 'warning' | 'info') => {
    setActiveToast({
      message: `This is a ${type} toast notification!`,
      type
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setActiveToast(null);
    }, 5000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header waitlistUrl={waitlistUrl} />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-center mb-6">
            Working Toast Notifications
          </h1>
          
          <p className="text-gray-600 text-center mb-8 max-w-2xl mx-auto">
            Click any button below to see a different type of toast notification
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <button
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={() => showToast('success')}
            >
              Success Toast
            </button>
            
            <button
              className="bg-red-600 hover:bg-red-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={() => showToast('error')}
            >
              Error Toast
            </button>
            
            <button
              className="bg-yellow-600 hover:bg-yellow-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={() => showToast('warning')}
            >
              Warning Toast
            </button>
            
            <button
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-3 rounded-lg"
              onClick={() => showToast('info')}
            >
              Info Toast
            </button>
          </div>
        </div>
      </main>
      
      {/* Render the toast when active */}
      {activeToast && (
        <Toast 
          message={activeToast.message} 
          type={activeToast.type} 
          onClose={() => setActiveToast(null)} 
        />
      )}
      
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}