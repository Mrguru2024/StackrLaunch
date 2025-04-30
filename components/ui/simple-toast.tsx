import React, { useState, useEffect } from 'react';
import { X, CheckCircle2, AlertTriangle, AlertCircle, Info } from 'lucide-react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onClose?: () => void;
};

// A very simple toast component that doesn't rely on complex hooks
export const SimpleToast: React.FC<ToastProps> = ({
  message,
  type = 'info',
  duration = 3000,
  onClose,
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!visible) return null;

  const styles = {
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

  const style = styles[type];

  return (
    <div
      className={`toast p-4 rounded shadow-lg border-l-4 animate-slide max-w-sm ${style.bg} ${style.border} ${style.text}`}
      role="alert"
    >
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          {style.icon}
          <div className="ml-3">{message}</div>
        </div>
        <button
          onClick={() => {
            setVisible(false);
            if (onClose) onClose();
          }}
          className="text-gray-500 hover:text-gray-700"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};

// Simple toast container that manages multiple toasts
type ToastContainerProps = {
  toasts: Array<ToastProps & { id: string }>;
  removeToast: (id: string) => void;
};

export const SimpleToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  removeToast,
}) => {
  return (
    <div className="toast-container fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((toast) => (
        <SimpleToast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </div>
  );
};

// Toast context for application-wide usage
type ToastContextType = {
  addToast: (toast: Omit<ToastProps, 'onClose'>) => void;
};

export const SimpleToastContext = React.createContext<ToastContextType | null>(null);

export const SimpleToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Array<ToastProps & { id: string }>>([]);

  const addToast = (toast: Omit<ToastProps, 'onClose'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <SimpleToastContext.Provider value={{ addToast }}>
      {children}
      <SimpleToastContainer toasts={toasts} removeToast={removeToast} />
    </SimpleToastContext.Provider>
  );
};

// Hook to use the toast functionality
export const useSimpleToast = () => {
  const context = React.useContext(SimpleToastContext);
  if (!context) {
    throw new Error('useSimpleToast must be used within a SimpleToastProvider');
  }
  return context;
};