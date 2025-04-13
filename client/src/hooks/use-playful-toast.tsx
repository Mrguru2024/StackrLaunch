import { toast as baseToast } from "@/hooks/use-toast";
import React from "react";

// Animation types available for the toast
type AnimationType = "default" | "bounce" | "pulse" | "wiggle" | "tada" | "pop" | "slide";

// Toast variants
type ToastVariantType = 
  | "default" 
  | "destructive" 
  | "success" 
  | "warning" 
  | "info" 
  | "money" 
  | "tip" 
  | "celebration" 
  | "ai";

type PlayfulToastOptions = {
  title?: React.ReactNode;
  description?: React.ReactNode;
  variant?: ToastVariantType;
  animation?: AnimationType;
  duration?: number; // in milliseconds
  action?: React.ReactNode;
};

/**
 * Custom hook for displaying playful toast notifications with character
 * This hook extends the default toast functionality with animations and themed variants
 */
export function usePlayfulToast() {
  /**
   * Show a success toast notification
   */
  const success = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "success",
      animation: options.animation || "pop",
      title: options.title || "Success!",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  };

  /**
   * Show a warning toast notification
   */
  const warning = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "warning",
      animation: options.animation || "wiggle",
      title: options.title || "Warning",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  };

  /**
   * Show an error toast notification
   */
  const error = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "destructive",
      animation: options.animation || "wiggle",
      title: options.title || "Error",
      description: options.description,
      duration: options.duration || 5000,
      action: options.action,
    });
  };

  /**
   * Show an info toast notification
   */
  const info = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "info",
      animation: options.animation || "slide",
      title: options.title || "Info",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  };

  /**
   * Show a money-related toast notification
   */
  const money = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "money",
      animation: options.animation || "tada",
      title: options.title || "Money update",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  };

  /**
   * Show a tip toast notification
   */
  const tip = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "tip",
      animation: options.animation || "pop",
      title: options.title || "Tip",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  };

  /**
   * Show a celebration toast notification
   */
  const celebration = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "celebration",
      animation: options.animation || "tada",
      title: options.title || "Congratulations!",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  };

  /**
   * Show an AI-related toast notification
   */
  const ai = (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "ai",
      animation: options.animation || "slide",
      title: options.title || "AI Assistant",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  };

  /**
   * Show a custom toast notification with any combination of options
   */
  const custom = (options: PlayfulToastOptions) => {
    return baseToast({
      variant: options.variant || "default",
      animation: options.animation,
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
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

// Also export individual toast functions for direct use
export const playfulToast = {
  success: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "success",
      animation: options.animation || "pop",
      title: options.title || "Success!",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  },
  warning: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "warning",
      animation: options.animation || "wiggle",
      title: options.title || "Warning",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  },
  error: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "destructive",
      animation: options.animation || "wiggle",
      title: options.title || "Error",
      description: options.description,
      duration: options.duration || 5000,
      action: options.action,
    });
  },
  info: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "info",
      animation: options.animation || "slide",
      title: options.title || "Info",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  },
  money: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "money",
      animation: options.animation || "tada",
      title: options.title || "Money update",
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  },
  tip: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "tip",
      animation: options.animation || "pop",
      title: options.title || "Tip",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  },
  celebration: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "celebration",
      animation: options.animation || "tada",
      title: options.title || "Congratulations!",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  },
  ai: (options: Omit<PlayfulToastOptions, "variant">) => {
    return baseToast({
      variant: "ai",
      animation: options.animation || "slide",
      title: options.title || "AI Assistant",
      description: options.description,
      duration: options.duration || 4000,
      action: options.action,
    });
  },
  custom: (options: PlayfulToastOptions) => {
    return baseToast({
      variant: options.variant || "default",
      animation: options.animation,
      title: options.title,
      description: options.description,
      duration: options.duration || 3000,
      action: options.action,
    });
  },
};