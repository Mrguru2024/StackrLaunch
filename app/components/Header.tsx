'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

// Use the original StackZen logo
const logoSrc = '/StackZenOriginalLogo.svg';

interface HeaderProps {
  waitlistUrl?: string;
}

export default function Header({ waitlistUrl }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/logo.png"
                alt="StackZen Logo"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-[#233D4D]">StackZen</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
