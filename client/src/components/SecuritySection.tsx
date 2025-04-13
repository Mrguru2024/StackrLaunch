import { motion } from "framer-motion";
import { Shield, Lock, CheckCircle2, ServerCrash, Eye, KeyRound } from "lucide-react";

export default function SecuritySection() {
  const securityFeatures = [
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Bank-Level Encryption",
      description: "We use 256-bit encryption to secure all your data, the same level of security used by major financial institutions."
    },
    {
      icon: <Lock className="h-8 w-8 text-primary" />,
      title: "Secure Authentication",
      description: "Multi-factor authentication and biometric security options keep your account protected from unauthorized access."
    },
    {
      icon: <CheckCircle2 className="h-8 w-8 text-primary" />,
      title: "Regular Security Audits",
      description: "We conduct regular security audits and penetration testing to identify and address potential vulnerabilities."
    },
    {
      icon: <ServerCrash className="h-8 w-8 text-primary" />,
      title: "Disaster Recovery",
      description: "Our robust disaster recovery plan ensures your data is safe and accessible even in the event of service disruptions."
    },
    {
      icon: <Eye className="h-8 w-8 text-primary" />,
      title: "Privacy First",
      description: "We never sell your data to third parties and provide transparent privacy controls so you know exactly who can see your information."
    },
    {
      icon: <KeyRound className="h-8 w-8 text-primary" />,
      title: "API Security",
      description: "All connections to financial institutions are made through secure, read-only APIs that never store your banking credentials."
    }
  ];

  return (
    <section id="security" className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Security You Can Trust</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We take your financial security seriously. Stackr implements industry-leading security measures to ensure your data and money are always protected.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {securityFeatures.map((feature, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 bg-purple-50 p-3 rounded-full">
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 p-8 bg-gradient-to-r from-primary/10 to-green-500/10 rounded-xl text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-2xl font-bold mb-4">Your Peace of Mind is Our Priority</h3>
          <p className="text-lg max-w-2xl mx-auto">
            At Stackr, we believe financial automation should never come at the cost of security. 
            That's why we've built our platform with security at its core, 
            so you can focus on growing your wealth without worry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}