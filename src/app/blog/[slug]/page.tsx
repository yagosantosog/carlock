'use client';

import { useEffect, useState } from 'react';
import { getPostBySlug } from '@/lib/strapi';
import { StrapiPost } from '@/types/blog';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { getStrapiURL } from '@/lib/utils';

export default function PostPage({ params }: { params: { slug: string } }) {
  const [post, setPost] = useState<StrapiPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!params.slug) return;

    const fetchPost = async () => {
      try {
        setLoading(true);
        const postData = await getPostBySlug(params.slug);
        if (postData) {
          setPost(postData);
        } else {
          setError('Post não encontrado.');
        }
      } catch (err) {
        setError('Falha ao carregar o post.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

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

  if (error || !post) {
    return <div className="container mx-auto py-10 text-center">{error || 'Post não encontrado.'}</div>;
  }

  const { title, author, createdAt, coverImage, content, tags } = post.attributes;

  const formatDate = (date: string) => {
    return format(new Date(date), "dd 'de' MMMM 'de' yyyy", { locale: ptBR });
  };
  
  const coverImageUrl = coverImage.data ? getStrapiURL(coverImage.data.attributes.url) : '';

  return (
    <article className="container mx-auto py-10 px-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
        <p className="text-muted-foreground">
          Por {author} em {formatDate(createdAt)}
        </p>
      </header>
      {coverImageUrl && (
        <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
          <Image src={coverImageUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
      )}
      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <ContentRenderer data={content} />
      </div>
      {tags?.data && tags.data.length > 0 && (
        <div className="mt-8">
          {tags.data.map((tag) => (
            <Badge key={tag.id} variant="secondary" className="mr-2 mb-2">
              {tag.attributes.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
