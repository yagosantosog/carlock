'use client';

import { useEffect, useState } from 'react';
import { getPosts } from '@/lib/strapi';
import { StrapiPost } from '@/types/blog';
import { PostList } from '@/components/blog/PostList';
import { Skeleton } from '@/components/ui/skeleton';

export default function BlogPage() {
  const [posts, setPosts] = useState<StrapiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const postsData = await getPosts();
        setPosts(postsData);
      } catch (err) {
        setError('Falha ao carregar os posts.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notícias, dicas e atualizações sobre segurança veicular.
        </p>
      </div>
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex flex-col space-y-3">
              <Skeleton className="h-[225px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
         <p className="text-center text-red-500">{error}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}
