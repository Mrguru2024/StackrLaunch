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

async function getPosts() {
  try {
    const posts = await sanity.fetch(
      `*[_type == "post" && status == "published"] | order(publishedAt desc) {
        title,
        slug,
        excerpt,
        publishedAt,
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
      <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
        <div className="container px-4 py-16 mx-auto">
          <div className="flex flex-col items-center text-center mb-16">
            <h1 className="text-5xl font-bold tracking-tight mb-4">Our Blog</h1>
            <p className="text-xl text-muted-foreground max-w-2xl">
              Discover insights, tutorials, and updates from our team
            </p>
          </div>

          {posts.length === 0 ? (
            <div className="text-center">
              <p className="text-xl text-muted-foreground mb-8">
                No posts available at the moment. Check back soon for new content!
              </p>
              <Link href="/">
                <Button size="lg" className="group">
                  Return Home
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <Card
                  key={post.slug.current}
                  className="group hover:shadow-lg transition-shadow duration-300"
                >
                  <CardHeader>
                    <CardTitle className="line-clamp-2 group-hover:text-primary transition-colors">
                      {post.title}
                    </CardTitle>
                    <CardDescription>
                      {new Date(post.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {post.author?.image && (
                        <img
                          src={post.author.image}
                          alt={post.author.name}
                          className="w-8 h-8 rounded-full"
                        />
                      )}
                      <span className="text-sm text-muted-foreground">{post.author?.name}</span>
                    </div>
                    <Link href={`/blog/${post.slug.current}`}>
                      <Button variant="ghost" className="group-hover:text-primary">
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
