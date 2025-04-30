import * as React from 'react';
import * as ToastPrimitives from '@radix-ui/react-toast';
import { cva, type VariantProps } from 'class-variance-authority';
import {
  X,
  AlertCircle,
  CheckCircle,
  Info,
  DollarSign,
  Gift,
  Award,
  Lightbulb,
  Sparkles,
} from 'lucide-react';

import { cn } from '@/lib/utils';

// Define the possible toast variant types
type ToastVariantType =
  | 'default'
  | 'destructive'
  | 'success'
  | 'warning'
  | 'info'
  | 'money'
  | 'tip'
  | 'celebration'
  | 'ai'
  | undefined;

// This component will render a different icon based on the toast variant
const ToastIcon = ({ variant }: { variant?: ToastVariantType }) => {
  const iconClasses = 'h-5 w-5 mr-2';

  switch (variant) {
    case 'success':
      return <CheckCircle className={cn(iconClasses, 'text-green-600')} />;
    case 'warning':
      return <AlertCircle className={cn(iconClasses, 'text-yellow-600')} />;
    case 'info':
      return <Info className={cn(iconClasses, 'text-blue-600')} />;
    case 'money':
      return <DollarSign className={cn(iconClasses, 'text-green-600')} />;
    case 'tip':
      return <Lightbulb className={cn(iconClasses, 'text-purple-600')} />;
    case 'celebration':
      return <Sparkles className={cn(iconClasses, 'text-indigo-600')} />;
    case 'ai':
      return (
        <div className={cn(iconClasses, 'rounded-full', 'relative')}>
          <span className="absolute inset-0 flex items-center justify-center text-blue-600 font-semibold">
            AI
          </span>
        </div>
      );
    case 'destructive':
      return <AlertCircle className={cn(iconClasses, 'text-red-600')} />;
    default:
      return <Info className={cn(iconClasses, 'text-foreground')} />;
  }
};

const ToastProvider = ToastPrimitives.Provider;

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      'fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]',
      className
    )}
    {...props}
  />
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;

const toastVariants = cva(
  'group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full',
  {
    variants: {
      variant: {
        default: 'border bg-background text-foreground',
        destructive:
          'destructive group border-destructive bg-destructive text-destructive-foreground',
        success:
          'success group border-green-500 bg-green-50 text-green-900 shadow-lg shadow-green-100',
        warning:
          'warning group border-yellow-500 bg-yellow-50 text-yellow-900 shadow-lg shadow-yellow-100',
        info: 'info group border-blue-500 bg-blue-50 text-blue-900 shadow-lg shadow-blue-100',
        money:
          'money group border-[#00CC88] bg-gradient-to-br from-green-50 to-green-100 text-green-900 shadow-lg shadow-green-100',
        tip: 'tip group border-[#7445FF] bg-gradient-to-br from-purple-50 to-purple-100 text-purple-900 shadow-lg shadow-purple-100',
        celebration:
          'celebration group border-indigo-500 bg-gradient-to-br from-indigo-50 to-indigo-100 text-indigo-900 shadow-lg shadow-indigo-100',
        ai: 'ai group border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100 text-blue-900 shadow-lg shadow-blue-100',
      },
      animation: {
        default: '', // No additional animation
        bounce: 'animate-bounce',
        pulse: 'animate-pulse',
        wiggle: 'animate-wiggle',
        tada: 'animate-tada',
        pop: 'animate-pop',
        slide: 'animate-slide',
      },
    },
    defaultVariants: {
      variant: 'default',
      animation: 'default',
    },
  }
);

// Define these animations in your global CSS
// We'll add them to index.css later

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants> & {
      onOpenChange?: (open: boolean) => void;
    }
>(({ className, variant, animation, onOpenChange, ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(toastVariants({ variant, animation }), className)}
      onOpenChange={onOpenChange}
      {...props}
    />
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      'inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive',
      className
    )}
    {...props}
  />
));
ToastAction.displayName = ToastPrimitives.Action.displayName;

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      'absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600',
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
));
ToastClose.displayName = ToastPrimitives.Close.displayName;

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title ref={ref} className={cn('text-sm font-semibold', className)} {...props} />
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn('text-sm opacity-90', className)}
    {...props}
  />
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// Define our custom animations type
type AnimationType = 'default' | 'bounce' | 'pulse' | 'wiggle' | 'tada' | 'pop' | 'slide';

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast> & {
  animation?: AnimationType;
  duration?: number;
};

type ToastActionElement = React.ReactElement<typeof ToastAction>;

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
  ToastIcon,
};
