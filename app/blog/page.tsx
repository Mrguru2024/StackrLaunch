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
        "author": author->{
          name,
          "image": image
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
      <div className="min-h-screen bg-gradient-to-br from-[#f8fafc] via-[#e0e7ef] to-[#c7d2fe] dark:bg-[#101624] dark:bg-gradient-to-br dark:from-[#181f2a] dark:via-[#101624] dark:to-[#181f2a]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* Return Home Button */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-700 bg-white border border-indigo-200 rounded-md shadow-sm hover:bg-indigo-50 dark:bg-[#232b3b] dark:text-indigo-200 dark:border-[#232b3b] dark:hover:bg-[#232b3b]/80 transition-colors"
            >
              <ArrowRight className="mr-2 h-4 w-4 rotate-180" />
              Return to Home
            </Link>
          </div>

          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-5xl md:text-6xl">
              <span className="block">Our Blog</span>
              <span className="block text-indigo-600 dark:text-indigo-400 mt-2">
                Stay updated with our latest insights, tips, and industry news
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
              <p className="text-gray-700 dark:text-gray-200 mb-8">
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
                  className="group relative flex flex-col overflow-hidden rounded-2xl bg-white dark:bg-[#232b3b] border border-indigo-100 dark:border-[#232b3b] shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {post.mainImage ? (
                      <img
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        src={urlForImage(post.mainImage).width(800).height(400).url()}
                        alt={post.title}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600">
                        <span className="text-4xl font-bold text-white">📝</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-white mb-3">
                        <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
                        <span>•</span>
                        <span>{post.readingTime} min read</span>
                      </div>
                      <Link href={`/blog/${post.slug.current}`} className="block">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                          {post.title}
                        </h3>
                      </Link>
                      <p className="mt-3 text-base text-gray-700 dark:text-white line-clamp-3">
                        {post.excerpt}
                      </p>
                    </div>
                    <div className="mt-6 flex items-center">
                      {post.author?.image ? (
                        <div className="flex-shrink-0">
                          <img
                            className="h-10 w-10 rounded-full ring-2 ring-white dark:ring-[#232b3b]"
                            src={urlForImage(post.author.image).width(40).height(40).url()}
                            alt={post.author.name}
                          />
                        </div>
                      ) : (
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600 dark:bg-indigo-900 dark:text-indigo-300">
                          {post.author?.name?.[0] || '?'}
                        </div>
                      )}
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {post.author?.name}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-white">
                          <span>Author</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}

          {/* Waitlist CTA Section */}
          <div className="mt-16 rounded-2xl bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center border border-indigo-200 dark:border-indigo-500">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">Have more questions?</h2>
            <p className="mt-4 text-lg text-white/90 dark:text-white">
              Join our waitlist to get updates and ask specific questions about how Stackr can help
              with your financial needs.
            </p>
            <div className="mt-8">
              <Link
                href="/waitlist"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50 dark:text-white dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors shadow"
              >
                Get Early Access & Ask Questions
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
