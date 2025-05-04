import { Metadata } from 'next';
import { getMetadata, generateJsonLd } from '@/lib/metadata';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { sanity } from '@/lib/sanity';
import { urlForImage } from '@/sanity/lib/image';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/sanity/schemaTypes/post';

interface Author {
  name: string;
  image?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const metadata = await getMetadata('blog');

  if (!metadata) {
    return {
      title: 'Blog - StackZen',
      description:
        'Read our latest articles, insights, and updates about technology and innovation.',
    };
  }

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
  };
}

async function getPosts(): Promise<Post[]> {
  try {
    const posts = await sanity.fetch<Post[]>(
      `*[_type == "post" && status == "published"] | order(publishedAt desc) {
        _id,
        title,
        slug,
        excerpt,
        publishedAt,
        mainImage,
        author->{
          name,
          image
        }
      }`
    );
    console.log('Fetched posts:', posts);
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();
  const metadata = await getMetadata('blog');
  const jsonLd = metadata ? generateJsonLd(metadata) : '';

  return (
    <>
      {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />}
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">StackZen Blog</span>
              <span className="block text-indigo-600 dark:text-indigo-400 mt-2">
                Insights & Updates
              </span>
            </h1>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-600 dark:text-gray-200">
              Discover the latest insights, tips, and updates from our team
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                No Posts Available
              </h2>
              <p className="text-gray-600 dark:text-gray-200 mb-8">
                We're working on some great content. Check back soon!
              </p>
              <Link
                href="/"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600"
              >
                Return Home
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <article
                  key={post._id}
                  className="flex flex-col overflow-hidden rounded-lg shadow-lg transition-all duration-300 hover:shadow-xl bg-white dark:bg-gray-800"
                >
                  <div className="flex-shrink-0">
                    {post.mainImage && (
                      <img
                        className="h-48 w-full object-cover"
                        src={urlForImage(post.mainImage).width(800).height(400).url()}
                        alt={post.title}
                      />
                    )}
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <Link href={`/blog/${post.slug.current}`} className="block">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-3 text-base text-gray-600 dark:text-gray-200 line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      {post.author?.image && (
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full"
                            src={urlForImage(post.author.image).width(40).height(40).url()}
                            alt={post.author.name}
                          />
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author?.name}
                        </p>
                        <div className="flex space-x-1 text-sm text-gray-600 dark:text-gray-200">
                          <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
