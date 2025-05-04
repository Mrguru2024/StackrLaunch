import { Metadata } from 'next';
import { sanity } from '@/lib/sanity';
import { urlForImage } from '@/lib/sanity/image';
import { formatDate } from '@/lib/utils';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface Post {
  title: string;
  slug: { current: string };
  content: any;
  publishedAt: string;
  author?: {
    name: string;
    image: any;
  };
  mainImage?: any;
}

async function getPost(slug: string) {
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      title,
      slug,
      content,
      publishedAt,
      mainImage,
      author->{
        name,
        image
      }
    }`,
    { slug }
  );
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPost(params.slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: `${post.title} | StackZen Blog`,
    description: post.content[0]?.children[0]?.text || 'Read this article on StackZen Blog',
  };
}

const components = {
  types: {
    image: ({ value }: any) => {
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
        </div>
      );
    },
  },
  marks: {
    link: ({ children, value }: any) => {
      const rel = !value.href.startsWith('/') ? 'noopener noreferrer' : undefined;
      const target = !value.href.startsWith('/') ? '_blank' : undefined;
      return (
        <a
          href={value.href}
          target={target}
          rel={rel}
          className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
        >
          {children}
        </a>
      );
    },
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-4xl font-bold mt-8 mb-4">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-3xl font-bold mt-8 mb-4">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-2xl font-bold mt-6 mb-3">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-xl font-bold mt-4 mb-2">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-indigo-500 pl-4 italic my-4">{children}</blockquote>
    ),
  },
};

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) notFound();

  return (
    <article className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Blog
        </Link>

        <header className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center">
            {post.author?.image && (
              <div className="flex-shrink-0">
                <Image
                  className="h-12 w-12 rounded-full"
                  src={urlForImage(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  width={48}
                  height={48}
                />
              </div>
            )}
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                {post.author?.name}
              </p>
              <div className="flex space-x-1 text-sm text-gray-600 dark:text-gray-200">
                <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
              </div>
            </div>
          </div>
        </header>

        {post.mainImage && (
          <div className="relative aspect-video mb-8 rounded-lg overflow-hidden">
            <Image
              src={urlForImage(post.mainImage).width(1200).height(630).url()}
              alt={post.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="prose prose-lg dark:prose-invert max-w-none prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-600 dark:prose-p:text-gray-200 prose-a:text-indigo-600 dark:prose-a:text-indigo-400 prose-strong:text-gray-900 dark:prose-strong:text-white prose-code:text-gray-900 dark:prose-code:text-white prose-pre:bg-gray-100 dark:prose-pre:bg-gray-800">
          <PortableText value={post.content} components={components} />
        </div>
      </div>
    </article>
  );
}
