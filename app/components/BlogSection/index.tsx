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

interface BlogPost {
  title: string;
  slug: {
    current: string;
  };
  excerpt: string;
  publishedAt: string;
  author: {
    name: string;
    image: string;
  };
}

interface BlogSectionProps {
  posts: BlogPost[];
}

export default function BlogSection({ posts }: BlogSectionProps) {
  return (
    <section className="py-24 bg-gradient-to-b from-background to-muted/20">
      <div className="container px-4 mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <Link href="/blog" className="group">
            <h2 className="text-4xl font-bold tracking-tight mb-4 group-hover:text-primary transition-colors">
              Our Blog
            </h2>
          </Link>
          <p className="text-xl text-muted-foreground max-w-2xl mb-8">
            Stay updated with our latest insights, tips, and industry news
          </p>
          <Link href="/blog">
            <Button size="lg" className="group">
              Visit Our Blog
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        {posts && posts.length > 0 && (
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
    </section>
  );
}
