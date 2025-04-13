import { Button } from "@/components/ui/button";
import { 
  Bot, 
  BadgeDollarSign, 
  TrendingUp, 
  Shield, 
  Calculator, 
  CheckCircle 
} from "lucide-react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

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
  return (
    <motion.div 
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow p-8 border border-gray-100 flex flex-col h-full"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className={`${iconBgColor} ${iconColor} rounded-lg p-3 inline-flex mb-6 self-start`}>
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-4">{title}</h3>
      <p className="text-gray-600 flex-grow">{description}</p>
      
      <div className="mt-6 pt-6 border-t border-gray-100">
        <div className="flex items-center text-sm text-gray-500">
          <CheckCircle className="text-green-600 mr-2 h-5 w-5" />
          <span>{benefit}</span>
        </div>
      </div>
    </motion.div>
  );
}

export default function BenefitsSection({ waitlistUrl }: BenefitsSectionProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const section = document.getElementById("benefits");
    if (section) {
      observer.observe(section);
    }

    return () => {
      if (section) {
        observer.unobserve(section);
      }
    };
  }, []);

  return (
    <section id="benefits" className="py-16 md:py-24 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Smart Money Management for Real People</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Stackr brings financial automation to those who need it most - people who work hard for their money and deserve to make it work harder for them.
          </p>
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
            delay={0.1}
          />
          
          <BenefitCard 
            icon={<BadgeDollarSign className="h-6 w-6" />}
            title="Cancel Hidden Charges"
            description="Our AI detects and helps you eliminate unused subscriptions, excessive fees, and overpriced services draining your accounts."
            benefit="Average savings of $650/year"
            iconBgColor="bg-green-100"
            iconColor="text-green-600"
            delay={0.2}
          />
          
          <BenefitCard 
            icon={<TrendingUp className="h-6 w-6" />}
            title="AI-Powered Growth"
            description="Use our smart algorithms to identify growth opportunities that align with your goals and risk tolerance."
            benefit="Personalized to your income patterns"
            iconBgColor="bg-blue-100"
            iconColor="text-blue-600"
            delay={0.3}
          />
          
          <BenefitCard 
            icon={<Shield className="h-6 w-6" />}
            title="Income Protection"
            description="Smart emergency fund management and insurance recommendations tailored to your work situation and risk exposure."
            benefit="Built for variable income streams"
            iconBgColor="bg-yellow-100"
            iconColor="text-yellow-600"
            delay={0.4}
          />
          
          <BenefitCard 
            icon={<Calculator className="h-6 w-6" />}
            title="Tax Optimization"
            description="Maximize your take-home pay with intelligent tax planning specifically designed for self-employed workers and side hustlers."
            benefit="Automatic deduction tracking"
            iconBgColor="bg-red-100"
            iconColor="text-red-600"
            delay={0.5}
          />
        </div>
        
        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <Button 
            size="lg" 
            className="inline-flex items-center shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition duration-200"
            data-tally-open="3NO0eG"
            data-tally-width="500" 
            data-tally-emoji-text="👋" 
            data-tally-emoji-animation="wave"
          >
            Get Early Access
            <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
            </svg>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
