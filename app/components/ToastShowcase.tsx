import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { usePlayfulToast } from "@/hooks/use-playful-toast";
import { DollarSign, AlertCircle, CheckCircle, Info, Lightbulb, Award, Sparkles } from "lucide-react";

/**
 * A component to showcase all our custom toast notifications
 * This can be embedded in any page to demonstrate the toast system
 */
export function ToastShowcase() {
  const toast = usePlayfulToast();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Success Toast */}
      <Card className="overflow-hidden border border-green-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="flex items-center text-green-700">
            <CheckCircle className="mr-2 h-5 w-5" />
            Success Toast
          </CardTitle>
          <CardDescription>For confirming actions were completed</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for positive confirmations like successful payments, 
            submissions, or when actions complete successfully.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-green-700 border-green-200 hover:bg-green-50"
              onClick={() => toast.success({
                title: "Payment successful!",
                description: "Your payment of $24.99 has been processed.",
                animation: "pop"
              })}
            >
              Pop Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-green-700 border-green-200 hover:bg-green-50"
              onClick={() => toast.success({
                title: "Account created!",
                description: "Your Stackr account is ready to use.",
                animation: "slide"
              })}
            >
              Slide Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Warning Toast */}
      <Card className="overflow-hidden border border-yellow-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-yellow-50 border-b border-yellow-100">
          <CardTitle className="flex items-center text-yellow-700">
            <AlertCircle className="mr-2 h-5 w-5" />
            Warning Toast
          </CardTitle>
          <CardDescription>For potential issues requiring attention</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for warnings like low balance alerts, session timeouts,
            or when user attention is needed but not critical.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-yellow-700 border-yellow-200 hover:bg-yellow-50"
              onClick={() => toast.warning({
                title: "Low balance",
                description: "Your account balance is below $50.",
                animation: "wiggle"
              })}
            >
              Wiggle Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-yellow-700 border-yellow-200 hover:bg-yellow-50"
              onClick={() => toast.warning({
                title: "Session expiring",
                description: "Your session will expire in 5 minutes.",
                animation: "pulse"
              })}
            >
              Pulse Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Error Toast */}
      <Card className="overflow-hidden border border-red-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-red-50 border-b border-red-100">
          <CardTitle className="flex items-center text-red-700">
            <AlertCircle className="mr-2 h-5 w-5" />
            Error Toast
          </CardTitle>
          <CardDescription>For critical issues requiring immediate attention</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for errors like failed payments, form submission errors,
            or when critical actions could not be completed.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => toast.error({
                title: "Payment failed",
                description: "Your payment could not be processed. Please try again.",
                animation: "wiggle"
              })}
            >
              Wiggle Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-red-700 border-red-200 hover:bg-red-50"
              onClick={() => toast.error({
                title: "Connection error",
                description: "Please check your internet connection and try again.",
                animation: "bounce"
              })}
            >
              Bounce Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Money Toast */}
      <Card className="overflow-hidden border border-green-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-green-50 border-b border-green-100">
          <CardTitle className="flex items-center text-green-700">
            <DollarSign className="mr-2 h-5 w-5" />
            Money Toast
          </CardTitle>
          <CardDescription>For financial updates and notifications</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for financial notifications like deposits, withdrawals,
            bill payments, or financial goal achievements.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-green-700 border-green-200 hover:bg-green-50"
              onClick={() => toast.money({
                title: "Deposit received",
                description: "$1,250.00 has been deposited into your account.",
                animation: "tada"
              })}
            >
              Tada Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-green-700 border-green-200 hover:bg-green-50"
              onClick={() => toast.money({
                title: "Bill paid automatically",
                description: "Your electric bill ($89.75) was paid automatically.",
                animation: "pop"
              })}
            >
              Pop Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tip Toast */}
      <Card className="overflow-hidden border border-purple-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-purple-50 border-b border-purple-100">
          <CardTitle className="flex items-center text-purple-700">
            <Lightbulb className="mr-2 h-5 w-5" />
            Tip Toast
          </CardTitle>
          <CardDescription>For helpful suggestions and tips</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for helpful tips, suggestions, and educational
            content that guides users or teaches them something new.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-purple-700 border-purple-200 hover:bg-purple-50"
              onClick={() => toast.tip({
                title: "Pro tip!",
                description: "Set up recurring transfers to save automatically each month.",
                animation: "pop"
              })}
            >
              Pop Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-purple-700 border-purple-200 hover:bg-purple-50"
              onClick={() => toast.tip({
                title: "Did you know?",
                description: "You can categorize expenses to track your spending habits.",
                animation: "slide"
              })}
            >
              Slide Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Celebration Toast */}
      <Card className="overflow-hidden border border-indigo-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-indigo-50 border-b border-indigo-100">
          <CardTitle className="flex items-center text-indigo-700">
            <Award className="mr-2 h-5 w-5" />
            Celebration Toast
          </CardTitle>
          <CardDescription>For achievements and milestones</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for celebrating achievements, milestones, and special occasions
            that recognize the user's progress or important dates.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-200 hover:bg-indigo-50"
              onClick={() => toast.celebration({
                title: "Savings goal reached!",
                description: "You've reached your vacation savings goal of $2,500!",
                animation: "tada"
              })}
            >
              Tada Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-indigo-700 border-indigo-200 hover:bg-indigo-50"
              onClick={() => toast.celebration({
                title: "One year with Stackr!",
                description: "You've been optimizing your finances with us for 1 year.",
                animation: "bounce"
              })}
            >
              Bounce Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Toast */}
      <Card className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="flex items-center text-blue-700">
            <Sparkles className="mr-2 h-5 w-5" />
            AI Insights Toast
          </CardTitle>
          <CardDescription>For AI-powered recommendations</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for AI-generated insights, personalized recommendations,
            and smart financial advice tailored to the user.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={() => toast.ai({
                title: "AI Insight",
                description: "Based on your spending, you could save $127 by optimizing subscriptions.",
                animation: "slide"
              })}
            >
              Slide Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={() => toast.ai({
                title: "Smart Recommendation",
                description: "Your income pattern suggests setting aside 15% for your emergency fund.",
                animation: "pop"
              })}
            >
              Pop Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Info Toast */}
      <Card className="overflow-hidden border border-blue-100 shadow-sm hover:shadow-md transition-shadow">
        <CardHeader className="bg-blue-50 border-b border-blue-100">
          <CardTitle className="flex items-center text-blue-700">
            <Info className="mr-2 h-5 w-5" />
            Info Toast
          </CardTitle>
          <CardDescription>For general information and notifications</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Use this for general information, updates, and neutral notifications
            that don't fit into other categories.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={() => toast.info({
                title: "App updated",
                description: "Stackr has been updated with new features.",
                animation: "slide"
              })}
            >
              Slide Animation
            </Button>
            <Button 
              variant="outline" 
              className="text-blue-700 border-blue-200 hover:bg-blue-50"
              onClick={() => toast.info({
                title: "Market update",
                description: "Financial markets have closed for the day.",
                animation: "default"
              })}
            >
              Default Animation
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Custom Duration Toast */}
      <Card className="overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow md:col-span-2 lg:col-span-3">
        <CardHeader className="bg-gray-50 border-b border-gray-200">
          <CardTitle className="text-gray-800">
            Custom Duration Toasts
          </CardTitle>
          <CardDescription>Control how long notifications stay visible</CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <p className="text-sm text-gray-600 mb-4">
            Every toast type can have a custom duration (in milliseconds). 
            This allows you to control how long each notification stays on screen.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline"
              onClick={() => toast.info({
                title: "Quick notification",
                description: "This toast only shows for 1 second.",
                duration: 1000
              })}
            >
              1 Second Toast
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast.info({
                title: "Standard notification",
                description: "This toast shows for the default 3 seconds."
              })}
            >
              Default Duration
            </Button>
            <Button 
              variant="outline"
              onClick={() => toast.info({
                title: "Extended notification",
                description: "This important toast stays visible for 8 seconds.",
                duration: 8000
              })}
            >
              8 Second Toast
            </Button>
          </div>
        </CardContent>
        <CardFooter className="bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          The default durations are: 3s for most toasts, 4s for warnings and tips, and 5s for errors.
        </CardFooter>
      </Card>
    </div>
  );
}