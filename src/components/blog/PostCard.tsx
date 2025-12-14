'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Post as StrapiPost, PostAttributes } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PostCardProps {
  post: StrapiPost; // O PostCard sempre espera o formato Strapi unificado
  isAdmin?: boolean;
}

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';

export function PostCard({ post, isAdmin = false }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  
  if (!post || !post.attributes) {
    // Retorna null ou um skeleton se o post for inválido para evitar crashes
    return null;
  }
  
  const { slug, title, publishedAt, coverImage, author, content, tags } = post.attributes;

  const postUrl = isAdmin ? `/admin/blog/${post.id}/edit` : `/blog/${slug}`;

  // Lógica de URL da imagem unificada
  const getImageUrl = () => {
    if (coverImage?.data?.attributes?.url) {
      return `${STRAPI_URL}${coverImage.data.attributes.url}`;
    }
    // Para posts do firebase, coverImage pode ser uma string de URL direta
    if (typeof coverImage === 'string') {
      return coverImage;
    }
    return placeholder?.imageUrl;
  };
  
  const imageUrl = getImageUrl();
  const imageAlt = coverImage?.data?.attributes?.alternativeText || title;
  
  const authorName = author?.data?.attributes?.name || (isAdmin ? 'Admin' : 'Autor Desconhecido');
  
  const extractSummary = (content: any) => {
    try {
       if (typeof content === 'string') {
        try {
          const data = JSON.parse(content);
          if (Array.isArray(data.blocks)) {
            const firstParagraph = data.blocks.find((block: any) => block.type === 'paragraph');
            const text = firstParagraph?.data.text || '';
            return text.substring(0, 150) + (text.length > 150 ? '...' : '');
          }
        } catch (e) {
          // Trata como string simples se não for JSON
          return content.substring(0, 150) + (content.length > 150 ? '...' : '');
        }
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
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-4">
            {publishedAt && format(new Date(publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR })} por {authorName}
          </p>
          <p className="text-sm text-muted-foreground">{extractSummary(content)}</p>
          
          {/* Lógica de Tags para Strapi e Firebase */}
          <div className="mt-4 flex flex-wrap gap-2">
            {(tags?.data && Array.isArray(tags.data)) ? (
                tags.data.map((tag) => (
                  <Badge key={tag.id} variant="secondary">{tag.attributes.name}</Badge>
                ))
            ) : (Array.isArray(tags) && tags.length > 0) ? (
                (tags as unknown as string[]).map((tag: string) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                ))
            ) : null}
          </div>
        </CardContent>
        <CardFooter className="mt-auto">
            <Button asChild variant="default" className="w-full">
              <span aria-hidden="true">{isAdmin ? 'Editar Post' : 'Ler Mais'}</span>
            </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
