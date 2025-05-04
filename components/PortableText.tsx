import { PortableText as BasePortableText } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import { cn } from '@/lib/utils';

const components = {
  block: {
    h1: ({ children }: { children: React.ReactNode }) => (
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl mt-8 mb-4">
        {children}
      </h1>
    ),
    h2: ({ children }: { children: React.ReactNode }) => (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mt-8 mb-4">
        {children}
      </h2>
    ),
    h3: ({ children }: { children: React.ReactNode }) => (
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-6 mb-3">
        {children}
      </h3>
    ),
    h4: ({ children }: { children: React.ReactNode }) => (
      <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-4 mb-2">
        {children}
      </h4>
    ),
    normal: ({ children }: { children: React.ReactNode }) => (
      <p className="text-base text-gray-600 dark:text-gray-200 leading-7 mb-4">{children}</p>
    ),
    blockquote: ({ children }: { children: React.ReactNode }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4 text-gray-700 dark:text-gray-300">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }: { children: React.ReactNode }) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }: { children: React.ReactNode }) => (
      <em className="italic text-gray-800 dark:text-gray-100">{children}</em>
    ),
    code: ({ children }: { children: React.ReactNode }) => (
      <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm font-mono">
        {children}
      </code>
    ),
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => {
      const target = value?.href?.startsWith('http') ? '_blank' : undefined;
      const rel = target === '_blank' ? 'noopener noreferrer' : undefined;
      return (
        <a
          href={value?.href}
          target={target}
          rel={rel}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 underline"
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }: { value: any }) => {
      if (!value?.asset?._ref) {
        return null;
      }
      return (
        <div className="relative aspect-video my-8 rounded-lg overflow-hidden">
          <Image
            src={urlForImage(value).width(1200).height(630).url()}
            alt={value.alt || ''}
            fill
            className="object-cover"
          />
          {value.caption && (
            <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-4 text-sm">
              {value.caption}
            </div>
          )}
        </div>
      );
    },
  },
};

interface PortableTextProps {
  value: any;
  className?: string;
}

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
