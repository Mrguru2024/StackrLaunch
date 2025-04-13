import { toast } from "@/hooks/use-toast";

// Toast variant types that match our styled variants
type ToastVariant = 
  | "default" 
  | "destructive" 
  | "success" 
  | "warning" 
  | "info" 
  | "money" 
  | "tip" 
  | "celebration" 
  | "ai";

// Animation types for our toasts
type ToastAnimation = 
  | "default" 
  | "bounce" 
  | "pulse" 
  | "wiggle" 
  | "tada" 
  | "pop" 
  | "slide";

// Basic toast options
interface StackrToastOptions {
  title?: string;
  description?: string;
  duration?: number;
  animation?: ToastAnimation;
}

/**
 * Custom hook for displaying playful Stackr toast notifications
 * This enhances the default toast with brand-specific variants and animations
 */
export function useStackrToast() {
  // Show a success toast
  const success = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "success",
      animation: options.animation || "pop",
      title: options.title || "Success!",
      description: options.description,
      duration: options.duration || 3000,
    });
  };

  // Show a warning toast
  const warning = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "warning",
      animation: options.animation || "wiggle",
      title: options.title || "Warning",
      description: options.description,
      duration: options.duration || 4000,
    });
  };

  // Show an error toast
  const error = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "destructive",
      animation: options.animation || "wiggle",
      title: options.title || "Error",
      description: options.description,
      duration: options.duration || 5000,
    });
  };

  // Show an info toast
  const info = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "info",
      animation: options.animation || "slide",
      title: options.title || "Info",
      description: options.description,
      duration: options.duration || 3000,
    });
  };

  // Show a money-related toast
  const money = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "money",
      animation: options.animation || "tada",
      title: options.title || "Money update",
      description: options.description,
      duration: options.duration || 3000,
    });
  };

  // Show a tip toast
  const tip = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "tip",
      animation: options.animation || "pop",
      title: options.title || "Tip",
      description: options.description,
      duration: options.duration || 4000,
    });
  };

  // Show a celebration toast
  const celebration = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "celebration",
      animation: options.animation || "tada",
      title: options.title || "Congratulations!",
      description: options.description,
      duration: options.duration || 4000,
    });
  };

  // Show an AI-related toast
  const ai = (options: StackrToastOptions = {}) => {
    return toast({
      variant: "ai",
      animation: options.animation || "slide",
      title: options.title || "AI Assistant",
      description: options.description,
      duration: options.duration || 4000,
    });
  };

  // Show a custom toast with the specified variant
  const custom = (variant: ToastVariant, options: StackrToastOptions = {}) => {
    return toast({
      variant,
      animation: options.animation,
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
    });
  };

  return {
    success,
    warning,
    error,
    info,
    money,
    tip,
    celebration,
    ai,
    custom,
  };
}

// Also export as a standalone object for direct use
export const stackrToast = {
  success: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "success",
      animation: options.animation || "pop",
      title: options.title || "Success!",
      description: options.description,
      duration: options.duration || 3000,
    });
  },
  warning: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "warning",
      animation: options.animation || "wiggle",
      title: options.title || "Warning",
      description: options.description,
      duration: options.duration || 4000,
    });
  },
  error: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "destructive",
      animation: options.animation || "wiggle",
      title: options.title || "Error",
      description: options.description,
      duration: options.duration || 5000,
    });
  },
  info: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "info",
      animation: options.animation || "slide",
      title: options.title || "Info",
      description: options.description,
      duration: options.duration || 3000,
    });
  },
  money: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "money",
      animation: options.animation || "tada",
      title: options.title || "Money update",
      description: options.description,
      duration: options.duration || 3000,
    });
  },
  tip: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "tip",
      animation: options.animation || "pop",
      title: options.title || "Tip",
      description: options.description,
      duration: options.duration || 4000,
    });
  },
  celebration: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "celebration",
      animation: options.animation || "tada",
      title: options.title || "Congratulations!",
      description: options.description,
      duration: options.duration || 4000,
    });
  },
  ai: (options: StackrToastOptions = {}) => {
    return toast({
      variant: "ai",
      animation: options.animation || "slide",
      title: options.title || "AI Assistant",
      description: options.description,
      duration: options.duration || 4000,
    });
  },
  custom: (variant: ToastVariant, options: StackrToastOptions = {}) => {
    return toast({
      variant,
      animation: options.animation,
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
    });
  },
};