'use client';

import Link from 'next/link';
import Image from 'next/image';

interface HeaderProps {
  waitlistUrl?: string;
}

export default function Header({ waitlistUrl: _waitlistUrl }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 h-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-center items-center h-full">
          <Link href="/" aria-label="StackZen Home">
            <Image
              src="/StackZenOriginalLogo.svg"
              alt="StackZen Logo"
              width={768}
              height={768}
              className="w-[768px] h-[768px]"
              priority
            />
          </Link>
        </div>
      </div>
    </header>
  );
}
