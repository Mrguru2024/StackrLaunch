import { Button } from '../../components/ui/button';
import { CircleDollarSign, TrendingUp, CheckCircle, PiggyBank } from 'lucide-react';
import { motion, Variants } from 'framer-motion';
import { useScrollReveal, createStaggeredDelays } from '../../hooks/use-scroll-reveal';

interface BenefitsSectionProps {
  waitlistUrl?: string;
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

function BenefitCard({
  icon,
  title,
  description,
  benefit,
  iconBgColor,
  iconColor,
  delay,
}: BenefitCardProps) {
  const { ref, controls, isInView } = useScrollReveal(0.2);

  // Card variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: delay || 0,
      },
    },
  };

  // Content variants for staggered animation
  const contentVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 flex flex-col h-full relative overflow-hidden"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      whileHover={{
        y: -5,
        boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { duration: 0.3 },
      }}
    >
      {/* Background highlight effect */}
      <motion.div
        className={`absolute -top-20 -right-20 w-40 h-40 rounded-full ${iconBgColor} opacity-10`}
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : { scale: 0 }}
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
      <motion.h3 className="text-xl font-bold mb-4 relative z-10" variants={contentVariants}>
        {title}
      </motion.h3>

      {/* Description with animated entrance */}
      <motion.p className="text-gray-600 flex-grow relative z-10" variants={contentVariants}>
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

export default function BenefitsSection({ waitlistUrl: _waitlistUrl }: BenefitsSectionProps) {
  const benefits = [
    {
      icon: <CircleDollarSign />,
      title: 'Smart Savings',
      description: 'Automatically optimize your savings with AI-powered recommendations.',
      benefit: 'Save more without thinking about it',
      iconBgColor: 'bg-green-500',
      iconColor: 'text-green-500',
    },
    {
      icon: <TrendingUp />,
      title: 'Investment Growth',
      description: 'Grow your wealth with personalized investment strategies.',
      benefit: 'Make your money work harder',
      iconBgColor: 'bg-blue-500',
      iconColor: 'text-blue-500',
    },
    {
      icon: <PiggyBank />,
      title: 'Goal Tracking',
      description: 'Set and track your financial goals with real-time progress updates.',
      benefit: 'Stay on track to reach your goals',
      iconBgColor: 'bg-purple-500',
      iconColor: 'text-purple-500',
    },
  ];

  // Hook for the section title
  const { ref: titleRef, controls: titleControls } = useScrollReveal(0.2);

  // Hook for the CTA button
  const { ref: ctaRef, controls: ctaControls } = useScrollReveal(0.1);

  // Title variants
  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Text element variants
  const textVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  // CTA button variants
  const ctaVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3,
      },
    },
  };

  // Create staggered delays for benefit cards
  const staggerDelays = createStaggeredDelays(benefits.length, 0.1);

  return (
    <section id="benefits" className="py-20 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div
          ref={titleRef}
          className="text-center mb-14"
          variants={titleVariants}
          initial="hidden"
          animate={titleControls}
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
            Stackr brings financial automation to those who need it most - people who work hard for
            their money and deserve to make it work harder for them.
          </motion.p>
        </motion.div>

        {/* Benefits Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <BenefitCard
            icon={<CircleDollarSign />}
            title="Smart Savings"
            description="Automatically optimize your savings with AI-powered recommendations."
            benefit="Save more without thinking about it"
            iconBgColor="bg-green-500"
            iconColor="text-green-500"
            delay={staggerDelays[0]}
          />

          <BenefitCard
            icon={<TrendingUp />}
            title="Investment Growth"
            description="Grow your wealth with personalized investment strategies."
            benefit="Make your money work harder"
            iconBgColor="bg-blue-500"
            iconColor="text-blue-500"
            delay={staggerDelays[1]}
          />

          <BenefitCard
            icon={<PiggyBank />}
            title="Goal Tracking"
            description="Set and track your financial goals with real-time progress updates."
            benefit="Stay on track to reach your goals"
            iconBgColor="bg-purple-500"
            iconColor="text-purple-500"
            delay={staggerDelays[2]}
          />
        </div>

        <motion.div
          ref={ctaRef}
          className="mt-16 text-center"
          variants={ctaVariants}
          initial="hidden"
          animate={ctaControls}
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
            <motion.button whileHover="hover" whileTap="tap" variants={ctaVariants}>
              Get Early Access
              <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </motion.button>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
