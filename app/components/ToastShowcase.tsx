import React from 'react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { usePlayfulToast } from '@/hooks/use-playful-toast';
import {
  DollarSign,
  AlertCircle,
  CheckCircle,
  Info,
  Lightbulb,
  Award,
  Sparkles,
} from 'lucide-react';

/**
 * A component to showcase all our custom toast notifications
 * This can be embedded in any page to demonstrate the toast system
 */
export default function ToastShowcase() {
  const toast = usePlayfulToast();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Toast Notifications</CardTitle>
        <CardDescription>
          Click the buttons to preview different toast notifications.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            className="text-green-700 border-green-200 hover:bg-green-50"
            onClick={() =>
              toast.success('Payment successful!', 'Your payment of $24.99 has been processed.')
            }
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            Success
          </Button>

          <Button
            variant="outline"
            className="text-red-700 border-red-200 hover:bg-red-50"
            onClick={() =>
              toast.error('Payment failed', 'There was an error processing your payment.')
            }
          >
            <AlertCircle className="w-4 h-4 mr-2" />
            Error
          </Button>

          <Button
            variant="outline"
            className="text-blue-700 border-blue-200 hover:bg-blue-50"
            onClick={() =>
              toast.info('New feature available', 'Check out our latest updates in the dashboard.')
            }
          >
            <Info className="w-4 h-4 mr-2" />
            Info
          </Button>

          <Button
            variant="outline"
            className="text-yellow-700 border-yellow-200 hover:bg-yellow-50"
            onClick={() =>
              toast.warning('Account expiring soon', 'Your subscription will expire in 3 days.')
            }
          >
            <Lightbulb className="w-4 h-4 mr-2" />
            Warning
          </Button>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">
          These are examples of our toast notifications. They can be used to show success messages,
          errors, warnings, and other important information.
        </p>
      </CardFooter>
    </Card>
  );
}
