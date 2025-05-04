import { PortableText as BasePortableText } from '@portabletext/react';
import type { PortableTextBlock } from '@portabletext/types';
import type { PortableTextReactComponents } from '@portabletext/react';
import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import { cn } from '@/lib/utils';

interface PortableTextProps {
  value: PortableTextBlock[];
  className?: string;
}

const components: Partial<PortableTextReactComponents> = {
  block: {
    h1: ({ children }) => (
      <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-3xl">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="text-base text-gray-600 dark:text-gray-200">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic text-gray-600 dark:text-gray-200">
        {children}
      </blockquote>
    ),
  },
  marks: {
    strong: ({ children }) => (
      <strong className="font-bold text-gray-900 dark:text-white">{children}</strong>
    ),
    em: ({ children }) => <em className="italic text-gray-900 dark:text-white">{children}</em>,
    code: ({ children }) => (
      <code className="rounded bg-gray-100 px-1 py-0.5 font-mono text-sm dark:bg-gray-800">
        {children}
      </code>
    ),
    link: ({ children, value }) => {
      const { href } = value as { href: string };
      return (
        <a
          href={href}
          className="text-indigo-600 hover:text-indigo-500 dark:text-indigo-400 dark:hover:text-indigo-300"
          target="_blank"
          rel="noopener noreferrer"
        >
          {children}
        </a>
      );
    },
  },
  list: {
    bullet: ({ children }) => (
      <ul className="list-disc space-y-2 pl-4 text-gray-600 dark:text-gray-200">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="list-decimal space-y-2 pl-4 text-gray-600 dark:text-gray-200">{children}</ol>
    ),
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
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

export function PortableText({ value, className }: PortableTextProps) {
  return (
    <div className={cn('prose prose-lg dark:prose-invert max-w-none', className)}>
      <BasePortableText value={value} components={components} />
    </div>
  );
}
