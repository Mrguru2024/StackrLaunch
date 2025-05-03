import { cookies } from 'next/headers';
import { sanity } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import PreviewBanner from '@/components/PreviewBanner';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export const revalidate = 60;

async function getPost(slug: string) {
  const isPreview = (await cookies()).get('__next_preview_data')?.value;
  return sanity.fetch(
    `*[_type == "post" && slug.current == $slug ${isPreview ? '' : '&& status == "published"'}][0]{
      title,
      content,
      publishedAt,
      author->{
        name,
        image,
        bio
      },
      excerpt
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
  if (!post) {
    return { title: 'Post Not Found - StackrLaunch' };
  }
  return {
    title: `${post.title} - StackrLaunch Blog`,
    description: post.excerpt || 'Read our latest blog post on StackrLaunch.',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);
  if (!post) {
    notFound();
  }

  return (
    <article className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 py-16 mx-auto">
        <Link
          href="/blog"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-primary mb-8 group"
        >
          <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform" />
          Back to Blog
        </Link>

        <div className="max-w-3xl mx-auto">
          <header className="mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            <div className="flex items-center space-x-4">
              {post.author?.image && (
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.image} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                </Avatar>
              )}
              <div>
                <p className="font-medium">{post.author?.name}</p>
                <p className="text-sm text-muted-foreground">
                  {new Date(post.publishedAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            </div>
          </header>

          <div className="prose prose-lg dark:prose-invert max-w-none">
            <PortableText value={post.content} />
          </div>

          {post.author?.bio && (
            <div className="mt-16 p-6 rounded-lg bg-muted/50">
              <h2 className="text-xl font-semibold mb-4">About the Author</h2>
              <div className="flex items-start space-x-4">
                {post.author.image && (
                  <Avatar className="h-16 w-16">
                    <AvatarImage src={post.author.image} alt={post.author.name} />
                    <AvatarFallback>{post.author.name.slice(0, 2)}</AvatarFallback>
                  </Avatar>
                )}
                <div>
                  <h3 className="font-medium">{post.author.name}</h3>
                  <p className="text-muted-foreground mt-2">{post.author.bio}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
