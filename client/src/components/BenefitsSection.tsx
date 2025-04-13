import { Button } from "@/components/ui/button";
import { 
  Bot, 
  BadgeDollarSign, 
  TrendingUp, 
  Shield, 
  Calculator, 
  CheckCircle 
} from "lucide-react";
import { motion, useAnimation, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useScrollReveal, createStaggeredDelays } from "@/hooks/use-scroll-reveal";

interface BenefitsSectionProps {
  waitlistUrl: string;
}

interface BenefitCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  benefit: string;
  iconBgColor: string;
  iconColor: string;
  delay: number;
}

function BenefitCard({ icon, title, description, benefit, iconBgColor, iconColor, delay }: BenefitCardProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ 
    threshold: 0.2,
    delay
  });

  // Card variants
  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0], // Improved easing curve
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  // Content variants for staggered animation
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div 
      ref={ref}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col h-full relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      whileHover={{ 
        y: -5,
        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        transition: { duration: 0.3 }
      }}
    >
      {/* Background highlight effect */}
      <motion.div 
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${iconBgColor} opacity-10`}
        initial={{ scale: 0 }}
        animate={isVisible ? { scale: 1 } : { scale: 0 }}
        transition={{ duration: 0.7, delay: delay + 0.3 }}
      />

      {/* Icon with animated entrance */}
      <motion.div 
        className={`${iconBgColor} ${iconColor} rounded-lg p-3 inline-flex mb-6 self-start relative z-10`}
        variants={contentVariants}
      >
        {icon}
      </motion.div>

      {/* Title with animated entrance */}
      <motion.h3 
        className="text-xl font-bold mb-4 relative z-10"
        variants={contentVariants}
      >
        {title}
      </motion.h3>

      {/* Description with animated entrance */}
      <motion.p 
        className="text-gray-600 flex-grow relative z-10"
        variants={contentVariants}
      >
        {description}
      </motion.p>
      
      {/* Benefit with animated entrance */}
      <motion.div 
        className="mt-6 pt-6 border-t border-gray-100 relative z-10"
        variants={contentVariants}
      >
        <div className="flex items-center text-sm text-gray-500">
          <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
          <span>{benefit}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function BenefitsSection({ waitlistUrl }: BenefitsSectionProps) {
  // Hook for the section title
  const [titleRef, isTitleVisible] = useScrollReveal<HTMLDivElement>({ 
    threshold: 0.2 
  });

  // Hook for the CTA button
  const [ctaRef, isCtaVisible] = useScrollReveal<HTMLDivElement>({ 
    threshold: 0.1,
    delay: 300
  });

  // Animation variants for the title section
  const titleVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 30
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        staggerChildren: 0.2
      }
    }
  };

  // Text element variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  // Button animation variants
  const buttonVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15
      }
    },
    hover: {
      y: -5,
      scale: 1.05,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    },
    tap: {
      scale: 0.98,
      boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      transition: {
        type: "spring",
        stiffness: 800,
        damping: 10
      }
    }
  };

  // Create staggered delays for benefit cards
  const staggerDelays = createStaggeredDelays(100, 5, 100);

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-40 left-10 w-64 h-64 bg-purple-100 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute bottom-40 right-10 w-96 h-96 bg-green-100 rounded-full opacity-20 blur-3xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div 
          ref={titleRef}
          className="text-center mb-16"
          variants={titleVariants}
          initial="hidden"
          animate={isTitleVisible ? "visible" : "hidden"}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-bold text-gray-900"
            variants={textVariants}
          >
            Smart Money Management for Real People
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            variants={textVariants}
          >
            Stackr brings financial automation to those who need it most - people who work hard 
            for their money and deserve to make it work harder for them.
          </motion.p>
        </motion.div>
        
        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard 
            icon={<Bot className="h-6 w-6" />}
            title="Automate Your Income"
            description="Set up smart rules to automatically allocate your income for bills, savings, and investments—no spreadsheets required."
            benefit="Saves 5+ hours per month"
            iconBgColor="bg-purple-100"
            iconColor="text-primary"
            delay={staggerDelays[0]}
          />
          
          <BenefitCard 
            icon={<BadgeDollarSign className="h-6 w-6" />}
            title="Cancel Hidden Charges"
            description="Our AI detects and helps you eliminate unused subscriptions, excessive fees, and overpriced services draining your accounts."
            benefit="Average savings of $650/year"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            delay={staggerDelays[1]}
          />
          
          <BenefitCard 
            icon={<TrendingUp className="h-6 w-6" />}
            title="AI-Powered Growth"
            description="Use our smart algorithms to identify growth opportunities that align with your goals and risk tolerance."
            benefit="Personalized to your income patterns"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            delay={staggerDelays[2]}
          />
          
          <BenefitCard 
            icon={<Shield className="h-6 w-6" />}
            title="Income Protection"
            description="Smart emergency fund management and insurance recommendations tailored to your work situation and risk exposure."
            benefit="Built for variable income streams"
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            delay={staggerDelays[3]}
          />
          
          <BenefitCard 
            icon={<Calculator className="h-6 w-6" />}
            title="Tax Optimization"
            description="Maximize your take-home pay with intelligent tax planning specifically designed for self-employed workers and side hustlers."
            benefit="Automatic deduction tracking"
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            delay={staggerDelays[4]}
          />
        </div>
        
        <motion.div 
          ref={ctaRef}
          className="mt-16 text-center"
          variants={buttonVariants}
          initial="hidden"
          animate={isCtaVisible ? "visible" : "hidden"}
        >
          <Button 
            size="lg" 
            className="inline-flex items-center shadow-lg"
            data-tally-open="3NO0eG"
            data-tally-width="500" 
            data-tally-emoji-text="👋" 
            data-tally-emoji-animation="wave"
            asChild
          >
            <motion.button
              whileHover="hover"
              whileTap="tap"
              variants={buttonVariants}
            >
              Get Early Access
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </motion.button>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
