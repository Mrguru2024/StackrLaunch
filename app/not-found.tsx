import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
            <span className="block">404</span>
            <span className="block text-indigo-600 dark:text-indigo-400 mt-2">Page Not Found</span>
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-700 dark:text-gray-100">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Return Home
            </Link>
            <Link
              href="/blog"
              className="inline-flex items-center px-6 py-3 border border-gray-300 dark:border-gray-600 text-base font-medium rounded-md text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              Visit Blog
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
