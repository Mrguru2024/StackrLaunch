import { motion } from "framer-motion";

export default function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How Stackr Works</h2>
          <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
            Simple, transparent, and effective financial automation built for your specific needs.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-gray-200 transform -translate-x-1/2"></div>
          
          {/* Steps */}
          <div className="space-y-12 md:space-y-0 relative">
            {/* Step 1 */}
            <motion.div 
              className="md:grid md:grid-cols-2 md:gap-8 md:items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="md:text-right mb-8 md:mb-0 md:pr-12">
                <div className="bg-primary text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center mb-4 md:ml-auto">1</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Connect Your Accounts</h3>
                <p className="text-gray-600">Securely link your bank accounts, credit cards, and income sources for a complete financial picture.</p>
              </div>
              
              <div className="md:pl-12 relative">
                <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
                {/* Decorative dot for timeline */}
                <div className="hidden md:block absolute top-1/2 -left-4 h-8 w-8 bg-primary rounded-full transform -translate-y-1/2 border-4 border-white"></div>
              </div>
            </motion.div>
            
            {/* Step 2 */}
            <motion.div 
              className="md:grid md:grid-cols-2 md:gap-8 md:items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="md:order-2 md:text-left mb-8 md:mb-0 md:pl-12">
                <div className="bg-primary text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center mb-4">2</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Set Your Financial Rules</h3>
                <p className="text-gray-600">Create custom automation rules based on your income patterns, priorities, and financial goals.</p>
              </div>
              
              <div className="md:order-1 md:pr-12 relative">
                <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                  </svg>
                </div>
                {/* Decorative dot for timeline */}
                <div className="hidden md:block absolute top-1/2 -right-4 h-8 w-8 bg-primary rounded-full transform -translate-y-1/2 border-4 border-white"></div>
              </div>
            </motion.div>
            
            {/* Step 3 */}
            <motion.div 
              className="md:grid md:grid-cols-2 md:gap-8 md:items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="md:text-right mb-8 md:mb-0 md:pr-12">
                <div className="bg-primary text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center mb-4 md:ml-auto">3</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Let AI Work For You</h3>
                <p className="text-gray-600">Our technology handles the complex work of optimizing your finances, identifying savings, and growing your money.</p>
              </div>
              
              <div className="md:pl-12 relative">
                <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                {/* Decorative dot for timeline */}
                <div className="hidden md:block absolute top-1/2 -left-4 h-8 w-8 bg-primary rounded-full transform -translate-y-1/2 border-4 border-white"></div>
              </div>
            </motion.div>
            
            {/* Step 4 */}
            <motion.div 
              className="md:grid md:grid-cols-2 md:gap-8 md:items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="md:order-2 md:text-left mb-8 md:mb-0 md:pl-12">
                <div className="bg-green-600 text-white text-xl font-bold h-10 w-10 rounded-full flex items-center justify-center mb-4">4</div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">Watch Your Money Grow</h3>
                <p className="text-gray-600">Track your progress with clear visuals, get smart notifications, and adjust as your financial situation evolves.</p>
              </div>
              
              <div className="md:order-1 md:pr-12 relative">
                <div className="rounded-xl shadow-lg overflow-hidden bg-gray-200 h-48 md:h-64 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                </div>
                {/* Decorative dot for timeline */}
                <div className="hidden md:block absolute top-1/2 -right-4 h-8 w-8 bg-green-600 rounded-full transform -translate-y-1/2 border-4 border-white"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
