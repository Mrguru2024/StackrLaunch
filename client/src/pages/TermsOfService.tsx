import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TermsOfService() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <Link href="/" className="inline-block">
            <Button variant="outline" className="gap-2">
              <ChevronLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </Link>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-md overflow-hidden"
        >
          <div className="border-b border-gray-200 bg-primary/5 px-6 py-4">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Terms of Service</h1>
            <p className="text-gray-600 mt-1">Last Updated: April 13, 2025</p>
          </div>
          
          <div className="px-6 py-8 prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Welcome to Stackr ("Company", "we", "our", "us")! These Terms of Service ("Terms") govern your use of our website https://stackr.tech (the "Site") and our financial automation platform, including any content, functionality, and services offered on or through the Site.
            </p>
            
            <p>
              By accessing or using the Site, you agree to be bound by these Terms. Please read them carefully before you start using Stackr.
            </p>
            
            <h2>Account Registration</h2>
            <p>
              To use certain features of the Site, you may be required to register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <p>
              You are responsible for safeguarding your account and password. You agree not to disclose your password to any third party and to take responsibility for all activities that occur under your account.
            </p>
            
            <h2>Use of Services</h2>
            <h3>License</h3>
            <p>
              Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, and revocable license to use our services for your personal, non-commercial use.
            </p>
            
            <h3>Restrictions</h3>
            <p>You agree not to:</p>
            <ul>
              <li>Use the services in any way that violates any applicable laws</li>
              <li>Use the services for any fraudulent or unlawful purpose</li>
              <li>Interfere with or disrupt the integrity or performance of the services</li>
              <li>Attempt to gain unauthorized access to the services or related systems</li>
              <li>Reproduce, duplicate, copy, sell, or resell any portion of our services without express written permission</li>
              <li>Use any automated means or interface not provided by us to access our services</li>
            </ul>
            
            <h2>Financial Information and Services</h2>
            <p>
              Our platform may provide tools for financial management, automation, and information. The financial information provided through our services is for informational purposes only and should not be considered as financial advice.
            </p>
            
            <p>
              You are solely responsible for your financial decisions and activities. We strongly recommend consulting with a qualified financial advisor before making significant financial decisions.
            </p>
            
            <h2>Intellectual Property</h2>
            <p>
              The Site and its entire contents, features, and functionality (including but not limited to all information, software, text, displays, images, video, and audio, and the design, selection, and arrangement thereof) are owned by the Company, its licensors, or other providers of such material and are protected by copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.
            </p>
            
            <h2>Disclaimers</h2>
            <p>
              THE SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT ANY WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED.
            </p>
            
            <p>
              WE DO NOT GUARANTEE THE ACCURACY, COMPLETENESS, OR USEFULNESS OF ANY INFORMATION ON THE SITE OR THE SERVICES, AND NEITHER DO WE ADOPT NOR ENDORSE, NOR ARE WE RESPONSIBLE FOR, THE ACCURACY OR RELIABILITY OF ANY OPINION, ADVICE, OR STATEMENT MADE BY PARTIES OTHER THAN US.
            </p>
            
            <h2>Limitation of Liability</h2>
            <p>
              IN NO EVENT WILL WE, OUR AFFILIATES OR THEIR LICENSORS, SERVICE PROVIDERS, EMPLOYEES, AGENTS, OFFICERS, OR DIRECTORS BE LIABLE FOR DAMAGES OF ANY KIND, UNDER ANY LEGAL THEORY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE, OR INABILITY TO USE, THE SITE, THE SERVICES, ANY WEBSITES LINKED TO IT, ANY CONTENT ON THE SITE OR SUCH OTHER WEBSITES, INCLUDING ANY DIRECT, INDIRECT, SPECIAL, INCIDENTAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES.
            </p>
            
            <h2>Changes to Terms</h2>
            <p>
              We may revise and update these Terms from time to time in our sole discretion. All changes are effective immediately when we post them and apply to all access to and use of the Site thereafter.
            </p>
            
            <h2>Termination</h2>
            <p>
              We may terminate or suspend your account and access to the services at our sole discretion, without notice, for conduct that we believe violates these Terms or is harmful to other users of the services, us, or third parties, or for any other reason.
            </p>
            
            <h2>Governing Law</h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the State of New York, without giving effect to any principles of conflicts of law.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about these Terms, please contact us at:
            </p>
            <p className="ml-4">
              <strong>Email:</strong> terms@stackr.tech<br />
              <strong>Postal Address:</strong> Stackr Financial, Inc.<br />
              1441 Woodmont Ln NW #3442<br />
              Atlanta, GA 30318
            </p>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-8 text-center"
        >
          <Link href="/" className="text-primary hover:underline">
            Return to Home
          </Link>
        </motion.div>
      </div>
    </div>
  );
}