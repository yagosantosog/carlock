'use client';

import { useEffect, useState } from 'react';
import { StrapiPost } from '@/types/blog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PostList } from '@/components/blog/PostList';
import { Skeleton } from '@/components/ui/skeleton';

export default function AdminBlogPage() {
  const [posts, setPosts] = useState<StrapiPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      // Simulating no posts found
      setPosts([]);
    } catch (err) {
      setError('Falha ao carregar os posts.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <Button asChild>
          <Link href="/admin/blog/new">Criar Novo Post</Link>
        </Button>
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
        <PostList posts={posts} isAdmin onPostDeleted={fetchPosts} />
      )}
    </div>
  );
}
