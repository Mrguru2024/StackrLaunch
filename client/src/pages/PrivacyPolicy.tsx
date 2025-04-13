import { Link } from "wouter";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PrivacyPolicy() {
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
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Privacy Policy</h1>
            <p className="text-gray-600 mt-1">Last Updated: April 13, 2025</p>
          </div>
          
          <div className="px-6 py-8 prose prose-lg max-w-none">
            <h2>Introduction</h2>
            <p>
              Stackr ("we", "our", or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website https://stackr.tech (the "Site") or use our financial automation platform.
            </p>
            
            <p>
              Please read this Privacy Policy carefully. By accessing or using our Site, you acknowledge that you have read, understood, and agree to be bound by all the terms outlined in this policy.
            </p>
            
            <h2>Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>We may collect personal information that you voluntarily provide to us when you:</p>
            <ul>
              <li>Join our waitlist</li>
              <li>Register for an account</li>
              <li>Request information or assistance</li>
              <li>Participate in promotions, surveys, or contests</li>
              <li>Communicate with us directly</li>
            </ul>
            
            <p>The personal information we may collect includes:</p>
            <ul>
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Occupation</li>
              <li>Financial information necessary for the functioning of our services</li>
            </ul>
            
            <h3>Non-Personal Information</h3>
            <p>
              We may also collect non-personal information automatically when you visit our Site. This includes:
            </p>
            <ul>
              <li>IP address</li>
              <li>Browser type</li>
              <li>Device information</li>
              <li>Operating system</li>
              <li>Pages visited and time spent</li>
              <li>Referring website or application</li>
            </ul>
            
            <h2>How We Use Your Information</h2>
            <p>We may use the information we collect for various purposes, including to:</p>
            <ul>
              <li>Create and manage your account</li>
              <li>Provide and maintain our services</li>
              <li>Process transactions</li>
              <li>Send administrative information</li>
              <li>Send marketing and promotional communications (with your consent)</li>
              <li>Respond to inquiries and offer support</li>
              <li>Request feedback and improve our services</li>
              <li>Monitor usage of our services</li>
              <li>Protect our services and users</li>
              <li>Comply with legal obligations</li>
            </ul>
            
            <h2>Disclosure of Your Information</h2>
            <p>We may share your information in the following situations:</p>
            <ul>
              <li><strong>With Service Providers:</strong> We may share your information with third-party vendors, service providers, contractors, or agents who perform services for us.</li>
              <li><strong>Business Transfers:</strong> We may share or transfer your information in connection with, or during negotiations of, any merger, sale of company assets, financing, or acquisition of all or a portion of our business.</li>
              <li><strong>With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information where required to do so by law or in response to valid requests by public authorities.</li>
            </ul>
            
            <h2>Security of Your Information</h2>
            <p>
              We use appropriate technical and organizational measures to protect your information. However, no electronic transmission or storage of information can be guaranteed to be 100% secure. We cannot ensure or warrant the security of any information you transmit to us.
            </p>
            
            <h2>Cookies and Tracking Technologies</h2>
            <p>
              We use cookies and similar tracking technologies to collect and use information about you and your interaction with our Site. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
            </p>
            
            <h2>Third-Party Websites</h2>
            <p>
              Our Site may contain links to third-party websites that are not owned or controlled by us. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services.
            </p>
            
            <h2>Children's Privacy</h2>
            <p>
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personally identifiable information from children under 18. If we discover that a child under 18 has provided us with personal information, we will delete it immediately.
            </p>
            
            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
            </p>
            
            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <p className="ml-4">
              <strong>Email:</strong> privacy@stackr.tech<br />
              <strong>Postal Address:</strong> Stackr Financial, Inc.<br />
              123 Finance Street, Suite 500<br />
              New York, NY 10001
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