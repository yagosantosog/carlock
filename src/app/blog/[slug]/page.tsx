'use client';

import { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';
const API_URL_BASE = `${STRAPI_URL}/api/blog-posts`;

async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `?filters[slug][$eq]=${slug}&populate[author]=true&populate[coverImage]=true&populate[seo][populate][ogImage]=true&populate[tags]=true`;
  const url = `${API_URL_BASE}${query}`;

  try {
    const res = await fetch(url, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    const json = await res.json() as PostApiResponse;
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

export default function PostPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const [post, setPost] = useState<Post | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setIsLoading(true);

      // 1. Tentar carregar do localStorage
      try {
        const cachedPost = localStorage.getItem(`post-${slug}`);
        if (cachedPost) {
          const parsedPost = JSON.parse(cachedPost);
          setPost(parsedPost);
          setIsLoading(false);
          console.log("Post carregado do localStorage.");
          return;
        }
      } catch (e) {
        console.error("Erro ao carregar post do localStorage, buscando na API.", e);
      }
      
      // 2. Se não estiver no cache, buscar na API
      console.log("Nenhum cache encontrado, buscando post na API...");
      const fetchedPost = await getPostBySlug(slug);
      
      if(fetchedPost) {
        setPost(fetchedPost);
      }
      
      setIsLoading(false);
    };

    fetchPost();
  }, [slug]);


  if (isLoading) {
    return <div className="container mx-auto py-10 px-4 text-center">Carregando post...</div>;
  }

  if (!post) {
    return <div className="container mx-auto py-10 text-center">Post não encontrado.</div>;
  }

  const { title, publishedAt, content, coverImage, author, tags } = post;
  
  const imageUrl = coverImage?.url ? (coverImage.url.startsWith('http') ? coverImage.url : `${STRAPI_URL}${coverImage.url}`) : null;
  const imageAlt = coverImage?.alternativeText || title;
  const authorName = author?.name || 'Autor Desconhecido';
  const formattedDate = publishedAt ? format(new Date(publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '';

  return (
    <article className="container mx-auto py-10 px-4 max-w-4xl">
      <header className="mb-8 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
        <p className="text-muted-foreground">
          Por {authorName} em {formattedDate}
        </p>
      </header>
      
      {imageUrl && (
        <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden mb-8 shadow-lg">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <ContentRenderer data={content} />
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-8 text-center">
          {tags.map((tag, index) => (
            <Badge key={index} variant="secondary" className="mr-2 mb-2">
              {tag.name}
            </Badge>
          ))}
        </div>
      )}
    </article>
  );
}
