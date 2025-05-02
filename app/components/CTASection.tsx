'use client';

import { motion } from 'framer-motion';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { useState } from 'react';
import { Lock, ShieldCheck } from 'lucide-react';

interface CTASectionProps {
  waitlistUrl: string;
}

declare global {
  interface Window {
    Tally?: {
      openPopup: (
        formId: string,
        options: {
          layout: string;
          width: number;
          alignLeft?: boolean;
          hideTitle?: boolean;
          emoji?: {
            text: string;
            animation: string;
          };
          hiddenFields?: {
            [key: string]: string;
          };
        }
      ) => void;
    };
  }
}

export default function CTASection({ waitlistUrl }: CTASectionProps) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    occupation: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Use Tally.js to open the waitlist form in a modal
    if (window.Tally) {
      window.Tally.openPopup('3NO0eG', {
        layout: 'modal',
        width: 500,
        emoji: {
          text: '👋',
          animation: 'wave',
        },
        hiddenFields: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          occupation: formData.occupation,
        },
      });
    } else {
      // Fallback in case the Tally script hasn't loaded
      window.location.href = waitlistUrl;
    }
  };

  return (
    <section
      id="join-waitlist"
      className="py-20 md:py-32 px-4 bg-gradient-to-br from-[#233D4D] via-[#00C6A7] to-[#58C1E2] text-white"
    >
      <div className="max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Financial Future?
          </h2>
          <p className="text-xl md:text-2xl mb-12 text-white/90">
            Join the StackZen waitlist today and be among the first to take control of your finances
            with AI-powered automation.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-xl p-8 md:p-12 shadow-2xl max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <h3 className="text-2xl font-bold text-[#233D4D] mb-6">Join the Waitlist</h3>

          {/* Waitlist Form */}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label
                  htmlFor="first_name"
                  className="text-sm font-medium text-[#233D4D] text-left mb-1"
                >
                  First Name
                </Label>
                <Input
                  type="text"
                  id="first_name"
                  name="firstName"
                  className="w-full px-4 py-3 border border-[#E5E9F0] rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-[#00C6A7]"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label
                  htmlFor="last_name"
                  className="text-sm font-medium text-[#233D4D] text-left mb-1"
                >
                  Last Name
                </Label>
                <Input
                  type="text"
                  id="last_name"
                  name="lastName"
                  className="w-full px-4 py-3 border border-[#E5E9F0] rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-[#00C6A7]"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="email" className="text-sm font-medium text-[#233D4D] text-left mb-1">
                Email Address
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                className="w-full px-4 py-3 border border-[#E5E9F0] rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-[#00C6A7]"
                placeholder="Enter your email address"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <div>
              <Label
                htmlFor="occupation"
                className="text-sm font-medium text-[#233D4D] text-left mb-1"
              >
                What best describes you?
              </Label>
              <select
                id="occupation"
                name="occupation"
                className="w-full px-4 py-3 border border-[#E5E9F0] rounded-lg focus:ring-2 focus:ring-[#00C6A7] focus:border-[#00C6A7] bg-white"
                value={formData.occupation}
                onChange={handleInputChange}
                required
              >
                <option value="">Select an option</option>
                <option value="tradesperson">Tradesperson</option>
                <option value="side_hustler">Side Hustler</option>
                <option value="9_5_rebuilder">9-5 Worker Looking to Rebuild</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                className="w-full bg-[#00C6A7] hover:bg-[#233D4D] text-white font-bold py-3 px-6 rounded-lg text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:scale-105"
              >
                Join the Waitlist
              </Button>
            </div>

            <p className="text-xs text-[#8B95A5] mt-4">
              By joining, you agree to receive updates about StackZen. We respect your privacy and
              will never share your information.
            </p>
          </form>

          <div className="mt-8 flex items-center justify-center space-x-4">
            <div className="flex items-center text-sm text-[#8B95A5]">
              <Lock className="text-[#00C6A7] mr-2 h-4 w-4" />
              <span>Secure Signup</span>
            </div>
            <div className="flex items-center text-sm text-[#8B95A5]">
              <ShieldCheck className="text-[#00C6A7] mr-2 h-4 w-4" />
              <span>Privacy Protected</span>
            </div>
          </div>

          <div className="text-sm text-[#58C1E2] mt-4">
            <span className="font-semibold text-[#233D4D]">17+ people</span> have already joined the
            waitlist
          </div>
        </motion.div>
      </div>
    </section>
  );
}
