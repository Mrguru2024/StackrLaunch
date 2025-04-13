import React, { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function TestPage() {
  // Tally.so waitlist form URL (using the same as Home)
  const waitlistUrl = "https://tally.so/r/3NO0eG";
  const [toast, setToast] = useState<{
    visible: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  } | null>(null);
  
  const showTestToast = (type: 'success' | 'error' | 'warning' | 'info' = 'success') => {
    setToast({
      visible: true,
      message: `This is a ${type} toast notification.`,
      type: type
    });
    
    // Auto hide after 5 seconds
    setTimeout(() => {
      setToast(null);
    }, 5000);
  };

  // Toast styles based on type
  const toastStyles = {
    success: {
      bg: 'bg-green-100',
      border: 'border-green-500',
      text: 'text-green-800',
      icon: <CheckCircle2 className="text-green-500" size={20} />
    },
    error: {
      bg: 'bg-red-100',
      border: 'border-red-500',
      text: 'text-red-800',
      icon: <AlertCircle className="text-red-500" size={20} />
    },
    warning: {
      bg: 'bg-yellow-100',
      border: 'border-yellow-500',
      text: 'text-yellow-800',
      icon: <AlertTriangle className="text-yellow-500" size={20} />
    },
    info: {
      bg: 'bg-blue-100',
      border: 'border-blue-500',
      text: 'text-blue-800',
      icon: <Info className="text-blue-500" size={20} />
    },
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
            This is a simple test page to verify toast functionality. Each button shows a different type of toast.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Button onClick={() => showTestToast('success')} className="bg-green-600 hover:bg-green-700">
              Success Toast
            </Button>
            <Button onClick={() => showTestToast('error')} className="bg-red-600 hover:bg-red-700">
              Error Toast
            </Button>
            <Button onClick={() => showTestToast('warning')} className="bg-yellow-600 hover:bg-yellow-700">
              Warning Toast
            </Button>
            <Button onClick={() => showTestToast('info')} className="bg-blue-600 hover:bg-blue-700">
              Info Toast
            </Button>
          </div>
        </div>
      </main>
      
      {/* Directly render toast in the component */}
      {toast && toast.visible && (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
          <div 
            className={`p-4 rounded shadow-lg border-l-4 animate-slideIn max-w-sm ${toastStyles[toast.type].bg} ${toastStyles[toast.type].border} ${toastStyles[toast.type].text}`}
            role="alert"
          >
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {toastStyles[toast.type].icon}
                <div className="ml-3">{toast.message}</div>
              </div>
              <button
                onClick={() => setToast(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
      
      <Footer waitlistUrl={waitlistUrl} />
    </div>
  );
}