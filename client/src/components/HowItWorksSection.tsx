import { motion, Variants } from "framer-motion";
import { useScrollReveal, createStaggeredDelays } from "@/hooks/use-scroll-reveal";
import { ReactNode } from "react";

// Define the step item props interface
interface StepItemProps {
  number: string;
  title: string;
  description: string;
  alignment: "left" | "right";
  delay: number;
  dotColor: string;
  stepColor: string;
  children: ReactNode;
}

function StepItem({ 
  number, 
  title, 
  description, 
  alignment, 
  delay, 
  dotColor, 
  stepColor, 
  children 
}: StepItemProps) {
  const [ref, isVisible] = useScrollReveal<HTMLDivElement>({ 
    threshold: 0.2,
    delay: delay * 100
  });
  
  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants: Variants = {
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
      className={`md:grid md:grid-cols-2 md:gap-8 md:items-center relative`}
      variants={containerVariants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {/* Content side */}
      <div className={`${
        alignment === "right" 
          ? "md:text-right mb-8 md:mb-0 md:pr-12" 
          : "md:order-2 md:text-left mb-8 md:mb-0 md:pl-12"
      }`}>
        <motion.div 
          className={`${stepColor} text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center mb-4 ${
            alignment === "right" ? "md:ml-auto" : ""
          }`}
          variants={itemVariants}
          whileHover={{ scale: 1.1 }}
        >
          {number}
        </motion.div>
        
        <motion.h3 
          className="text-2xl font-bold text-gray-900 mb-3"
          variants={itemVariants}
        >
          {title}
        </motion.h3>
        
        <motion.p 
          className="text-gray-600"
          variants={itemVariants}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Image side */}
      <div className={`${
        alignment === "right" 
          ? "md:pl-12 relative" 
          : "md:order-1 md:pr-12 relative"
      }`}>
        {children}
        
        {/* Decorative dot for timeline */}
        <motion.div 
          className={`hidden md:block absolute top-1/2 ${
            alignment === "right" ? "-left-4" : "-right-4"
          } h-8 w-8 ${dotColor} rounded-full transform -translate-y-1/2 border-4 border-white z-10`}
          initial={{ scale: 0, opacity: 0 }}
          animate={isVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ 
            duration: 0.5,
            delay: delay * 0.1 + 0.3,
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        />
      </div>
    </motion.div>
  );
}

export default function HowItWorksSection() {
  // Title section scroll reveal
  const [titleRef, isTitleVisible] = useScrollReveal<HTMLDivElement>({ 
    threshold: 0.2 
  });

  // Title section animations
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

  // Text animations
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-purple-50 rounded-full opacity-50 blur-3xl transform -translate-x-1/2"></div>
        <div className="absolute bottom-1/4 left-0 w-80 h-80 bg-green-50 rounded-full opacity-40 blur-3xl"></div>
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
            How Stackr Works
          </motion.h2>
          <motion.p 
            className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto"
            variants={textVariants}
          >
            Simple, transparent, and effective financial automation built for your specific needs.
          </motion.p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Create scrolling timeline effect */}
          <motion.div 
            className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-primary to-green-600 transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          />
          
          {/* Steps */}
          <div className="space-y-16 md:space-y-36 relative">
            {/* Step 1 - Connect Accounts */}
            <StepItem 
              number="1"
              title="Connect Your Accounts"
              description="Securely link your bank accounts, credit cards, and income sources for a complete financial picture."
              alignment="right"
              delay={0.1}
              dotColor="bg-primary"
              stepColor="bg-primary"
            >
              <motion.div 
                className="rounded-xl shadow-lg overflow-hidden bg-white h-48 md:h-64 flex items-center justify-center relative"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-80"></div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-primary relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </motion.div>
              </motion.div>
            </StepItem>
            
            {/* Step 2 - Financial Rules */}
            <StepItem 
              number="2"
              title="Set Your Financial Rules"
              description="Create custom automation rules based on your income patterns, priorities, and financial goals."
              alignment="left"
              delay={0.2}
              dotColor="bg-primary"
              stepColor="bg-primary"
            >
              <motion.div 
                className="rounded-xl shadow-lg overflow-hidden bg-white h-48 md:h-64 flex items-center justify-center relative"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-white opacity-80"></div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </motion.div>
              </motion.div>
            </StepItem>
            
            {/* Step 3 - AI Work */}
            <StepItem 
              number="3"
              title="Let AI Work For You"
              description="Our technology handles the complex work of optimizing your finances, identifying savings, and growing your money."
              alignment="right"
              delay={0.3}
              dotColor="bg-primary"
              stepColor="bg-primary"
            >
              <motion.div 
                className="rounded-xl shadow-lg overflow-hidden bg-white h-48 md:h-64 flex items-center justify-center relative"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-white opacity-80"></div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-indigo-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
              </motion.div>
            </StepItem>
            
            {/* Step 4 - Growth */}
            <StepItem 
              number="4"
              title="Watch Your Money Grow"
              description="Track your progress with clear visuals, get smart notifications, and adjust as your financial situation evolves."
              alignment="left"
              delay={0.4}
              dotColor="bg-green-600"
              stepColor="bg-green-600"
            >
              <motion.div 
                className="rounded-xl shadow-lg overflow-hidden bg-white h-48 md:h-64 flex items-center justify-center relative"
                whileHover={{ 
                  boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" 
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-white opacity-80"></div>
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </motion.div>
              </motion.div>
            </StepItem>
          </div>
        </div>
      </div>
    </section>
  );
}
