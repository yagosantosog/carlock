'use client';

import { PostForm } from '@/components/blog/PostForm';
import { StrapiPost } from '@/types/blog';
import { useEffect, useState } from 'react';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<StrapiPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        // Simulate not found
        setError('Post não encontrado.');
      } catch (err) {
        setError('Falha ao carregar o post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="container mx-auto py-10 text-center text-red-500">{error}</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
      {post ? <PostForm post={post} /> : <p>Post não encontrado.</p>}
    </div>
  );
}
