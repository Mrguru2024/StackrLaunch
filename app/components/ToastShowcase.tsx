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
        <div className="space-y-2">
          <h3 className="text-lg font-medium">Success Toasts</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.success({
                  title: 'Success!',
                  description: 'Your action was completed successfully.',
                  animation: 'bounce',
                })
              }
            >
              Success Toast
            </Button>
            <Button
              onClick={() =>
                toast.success({
                  title: 'Deposit received',
                  description: '$1,250.00 has been deposited into your account.',
                  animation: 'tada',
                })
              }
            >
              Deposit Toast
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Warning Toasts</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.warning({
                  title: 'Warning!',
                  description: 'Please review your changes before proceeding.',
                  animation: 'wiggle',
                })
              }
            >
              Warning Toast
            </Button>
            <Button
              onClick={() =>
                toast.warning({
                  title: 'Low Balance',
                  description: 'Your account balance is running low.',
                  animation: 'pulse',
                })
              }
            >
              Balance Toast
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Error Toasts</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.error({
                  title: 'Error!',
                  description: 'Something went wrong. Please try again.',
                  animation: 'tada',
                })
              }
            >
              Error Toast
            </Button>
            <Button
              onClick={() =>
                toast.error({
                  title: 'Payment Failed',
                  description: 'Your payment could not be processed.',
                  animation: 'slide',
                })
              }
            >
              Payment Toast
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-lg font-medium">Info Toasts</h3>
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={() =>
                toast.info({
                  title: 'New Feature',
                  description: 'Check out our latest updates!',
                  animation: 'default',
                })
              }
            >
              Info Toast
            </Button>
            <Button
              onClick={() =>
                toast.info({
                  title: 'Tip',
                  description: 'Did you know you can use keyboard shortcuts?',
                  animation: 'bounce',
                })
              }
            >
              Tip Toast
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          These are examples of our toast notifications. They can be used to show success messages,
          errors, warnings, and other important information.
        </p>
      </CardFooter>
    </Card>
  );
}
