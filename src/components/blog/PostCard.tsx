'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PostCardProps {
  post: Post; // Agora sempre espera o formato Strapi
}

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';

export function PostCard({ post }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  const postUrl = `/blog/${post.attributes.slug}`;

  const imageUrl = post.attributes.coverImage?.data?.attributes.url
    ? `${STRAPI_URL}${post.attributes.coverImage.data.attributes.url}`
    : placeholder?.imageUrl;

  const imageAlt = post.attributes.coverImage?.data?.attributes.alternativeText || post.attributes.title;
  
  const authorName = post.attributes.author?.data?.attributes.name || 'Autor Desconhecido';
  
  const extractSummary = (content: any) => {
    try {
      if (typeof content === 'string') {
        // Tentativa de parse para formato Editor.js
        try {
          const data = JSON.parse(content);
          if (Array.isArray(data.blocks)) {
            const firstParagraph = data.blocks.find((block: any) => block.type === 'paragraph');
            return firstParagraph?.data.text.substring(0, 150) + '...' || '';
          }
        } catch (e) {
          // Se não for JSON, trata como string simples
          return content.substring(0, 150) + '...';
        }
      }
      // Se o conteúdo for markdown (ou string simples da API)
      if (typeof content === 'string') {
        return content.substring(0, 150) + '...';
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  return (
    <Link href={postUrl} className="group">
      <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        {imageUrl && (
          <div className="relative w-full h-48">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="text-xl font-bold leading-snug">
            {post.attributes.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-4">
            {post.attributes.publishedAt && format(new Date(post.attributes.publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })} por {authorName}
          </p>
          <p className="text-sm text-muted-foreground">{extractSummary(post.attributes.content)}</p>
          {post.attributes.tags?.data && Array.isArray(post.attributes.tags.data) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.attributes.tags.data.map((tag) => (
                <Badge key={tag.id} variant="secondary">{tag.attributes.name}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto">
            <Button asChild variant="default" className="w-full">
              <span aria-hidden="true">Ler Mais</span>
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
