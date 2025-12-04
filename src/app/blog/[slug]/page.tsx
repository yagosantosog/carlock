'use client';

import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Post } from '@/types/blog';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/blog/ContentRenderer';

export default function PostPage({ params }: { params: { slug: string } }) {
  const firestore = useFirestore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const fetchPost = async () => {
      const q = query(collection(firestore, 'posts'), where('slug', '==', params.slug));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        setPost({ id: doc.id, ...doc.data() } as Post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [firestore, params.slug]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4 max-w-4xl">
        <Skeleton className="h-8 w-3/4 mb-4" />
        <Skeleton className="h-4 w-1/4 mb-8" />
        <Skeleton className="h-[400px] w-full rounded-xl mb-8" />
        <div className="space-y-4">
          <Skeleton className="h-6 w-full" />
          <Skeleton className="h-6 w-5/6" />
          <Skeleton className="h-6 w-full" />
        </div>
      </div>
    );
  }

  if (!post) {
    return <div className="container mx-auto py-10 text-center">Post não encontrado.</div>;
  }

  const formatDate = (date: string | Date) => {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return format(dateObj, "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };

  return (
    <article className="container mx-auto py-10 px-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{post.title}</h1>
        <p className="text-muted-foreground">
          Por {post.author} em {post.createdAt && formatDate(post.createdAt as string)}
        </p>
      </header>
      {post.coverImage && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={post.coverImage} alt={post.title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <ContentRenderer data={post.content} />
      </div>
      {post.tags && post.tags.length > 0 && (
        <div className="mt-8">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary" className="mr-2 mb-2">
              {tag}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
