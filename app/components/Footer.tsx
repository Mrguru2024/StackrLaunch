import Link from 'next/link';
import Image from 'next/image';

interface FooterProps {
  waitlistUrl: string;
}

export default function Footer({ waitlistUrl }: FooterProps) {
  return (
    <footer className="bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-8 md:mb-0">
            <Image
              src="/StackZenOriginalLogo.svg"
              alt="Stackr Logo"
              width={32}
              height={32}
              className="h-8 w-auto"
            />
            <p className="text-gray-600 mt-2">Building the future of personal finance</p>
          </div>
          <div className="flex flex-col md:flex-row gap-8">
            <div>
              <h3 className="font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#features" className="text-gray-600 hover:text-gray-900">
                    Features
                  </Link>
                </li>
                <li>
                  <Link href="#benefits" className="text-gray-600 hover:text-gray-900">
                    Benefits
                  </Link>
                </li>
                <li>
                  <Link href="#pricing" className="text-gray-600 hover:text-gray-900">
                    Pricing
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/about" className="text-gray-600 hover:text-gray-900">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="text-gray-600 hover:text-gray-900">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link href="/careers" className="text-gray-600 hover:text-gray-900">
                    Careers
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/privacy" className="text-gray-600 hover:text-gray-900">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="text-gray-600 hover:text-gray-900">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Stackr. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
