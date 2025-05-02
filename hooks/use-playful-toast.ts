import { useToast } from '../components/ui/use-toast';

type ToastOptions = {
  title: string;
  description?: string;
  animation?: 'default' | 'bounce' | 'pulse' | 'wiggle' | 'tada' | 'pop' | 'slide';
};

export const usePlayfulToast = () => {
  const { toast } = useToast();

  return {
    success: (options: ToastOptions | string, description?: string) => {
      if (typeof options === 'string') {
        toast({
          title: options,
          description,
          variant: 'success',
        });
      } else {
        toast({
          ...options,
          variant: 'success',
        });
      }
    },
    error: (options: ToastOptions | string, description?: string) => {
      if (typeof options === 'string') {
        toast({
          title: options,
          description,
          variant: 'destructive',
        });
      } else {
        toast({
          ...options,
          variant: 'destructive',
        });
      }
    },
    info: (options: ToastOptions | string, description?: string) => {
      if (typeof options === 'string') {
        toast({
          title: options,
          description,
          variant: 'default',
        });
      } else {
        toast({
          ...options,
          variant: 'default',
        });
      }
    },
    warning: (options: ToastOptions | string, description?: string) => {
      if (typeof options === 'string') {
        toast({
          title: options,
          description,
          variant: 'warning',
        });
      } else {
        toast({
          ...options,
          variant: 'warning',
        });
      }
    },
  };
};
