import Image from 'next/image';
import { urlForImage } from '@/lib/sanity/image';
import { PortableText } from './PortableText';
import { formatDate } from '@/lib/utils';

interface BlogPostProps {
  post: {
    title: string;
    slug: { current: string };
    mainImage: any;
    publishedAt: string;
    author: {
      name: string;
      image: any;
    };
    categories: Array<{
      title: string;
    }>;
    excerpt: string;
    content: any;
    readingTime: number;
  };
}

export function BlogPost({ post }: BlogPostProps) {
  return (
    <article className="relative isolate">
      {/* Header */}
      <div className="relative">
        {post.mainImage && (
          <div className="relative aspect-[16/9] w-full overflow-hidden">
            <Image
              src={urlForImage(post.mainImage).width(1920).height(1080).url()}
              alt={post.mainImage.alt || post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="mx-auto max-w-3xl">
            <div className="flex items-center gap-x-4 text-sm text-white">
              <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              <span>•</span>
              <span>{post.readingTime} min read</span>
            </div>
            <h1 className="mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* Author and Categories */}
      <div className="mx-auto max-w-3xl px-4 py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-4">
            {post.author.image && (
              <Image
                src={urlForImage(post.author.image).width(40).height(40).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author.name}
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            {post.categories.map((category) => (
              <span
                key={category.title}
                className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {category.title}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-3xl px-4 pb-16">
        <div className="text-lg text-gray-600 dark:text-gray-300 mb-8">{post.excerpt}</div>
        <PortableText value={post.content} />
      </div>
    </article>
  );
}
