import React from "react";
import { Button } from "@/components/ui/button";
import { stackrToast } from "@/hooks/use-stackr-toast";

/**
 * A component to showcase all our custom toast notifications
 * This can be embedded in any page to demonstrate the toast system
 */
export function ToastShowcase() {
  return (
    <div className="my-8 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Toast Notification Showcase</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <h3 className="font-semibold mb-2">Basic</h3>
          <div className="space-y-2">
            <Button 
              variant="default" 
              className="w-full"
              onClick={() => stackrToast.success({ 
                title: "Success!", 
                description: "Your action was completed successfully." 
              })}
            >
              Success
            </Button>
            
            <Button 
              variant="destructive" 
              className="w-full"
              onClick={() => stackrToast.error({ 
                title: "Error!", 
                description: "Something went wrong. Please try again." 
              })}
            >
              Error
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Info", 
                description: "Here's some information you might find useful." 
              })}
            >
              Info
            </Button>
            
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => stackrToast.warning({ 
                title: "Warning", 
                description: "Proceed with caution." 
              })}
            >
              Warning
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Stackr Themed</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
              onClick={() => stackrToast.money({ 
                title: "Money update", 
                description: "Your account balance has been updated." 
              })}
            >
              Money
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-purple-50 text-purple-700 border-purple-200 hover:bg-purple-100"
              onClick={() => stackrToast.tip({ 
                title: "Quick tip", 
                description: "Save 20% by setting up automatic payments." 
              })}
            >
              Tip
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100"
              onClick={() => stackrToast.celebration({ 
                title: "Congratulations!", 
                description: "You've reached a new milestone!" 
              })}
            >
              Celebration
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
              onClick={() => stackrToast.ai({ 
                title: "AI Assistant", 
                description: "I've analyzed your expenses and found savings opportunities." 
              })}
            >
              AI
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Animations</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.success({ 
                title: "Bounce Animation", 
                description: "This toast bounces to get attention.",
                animation: "bounce"
              })}
            >
              Bounce
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Pulse Animation", 
                description: "This toast has a pulsing effect.",
                animation: "pulse"
              })}
            >
              Pulse
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.warning({ 
                title: "Wiggle Animation", 
                description: "This toast wiggles for emphasis.",
                animation: "wiggle"
              })}
            >
              Wiggle
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.money({ 
                title: "Tada Animation", 
                description: "Tada! This toast has flair.",
                animation: "tada"
              })}
            >
              Tada
            </Button>
          </div>
        </div>
        
        <div>
          <h3 className="font-semibold mb-2">Duration</h3>
          <div className="space-y-2">
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Quick toast", 
                description: "This toast disappears after 1 second",
                duration: 1000
              })}
            >
              1 second
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Medium toast", 
                description: "This toast stays for 3 seconds",
                duration: 3000
              })}
            >
              3 seconds
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Long toast", 
                description: "This toast stays for 5 seconds",
                duration: 5000
              })}
            >
              5 seconds
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => stackrToast.info({ 
                title: "Very long toast", 
                description: "This toast stays for 10 seconds",
                duration: 10000
              })}
            >
              10 seconds
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}