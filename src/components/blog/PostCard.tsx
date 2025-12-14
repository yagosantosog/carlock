'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Post as StrapiPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PostCardProps {
  post: StrapiPost;
}

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';

export function PostCard({ post }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  
  if (!post || !post.attributes) {
    return null;
  }
  
  const { slug, title, publishedAt, coverImage, author, content, tags } = post.attributes;

  const postUrl = `/blog/${slug}`;

  const getImageUrl = () => {
    if (coverImage?.data?.attributes?.url) {
      const url = coverImage.data.attributes.url;
      return url.startsWith('http') ? url : `${STRAPI_URL}${url}`;
    }
    return placeholder?.imageUrl;
  };
  
  const imageUrl = getImageUrl();
  const imageAlt = coverImage?.data?.attributes?.alternativeText || title;
  
  const authorName = author?.data?.attributes?.name || 'Autor Desconhecido';
  
  const extractSummary = (content: any): string => {
    if (!content) return '';
    try {
      if (typeof content === 'string') {
        const parsed = JSON.parse(content);
        const firstParagraph = parsed.blocks?.find((block: any) => block.type === 'paragraph');
        if (firstParagraph) {
          const text = firstParagraph.data.text.replace(/&nbsp;/g, ' ');
          return text.substring(0, 100) + (text.length > 100 ? '...' : '');
        }
      }
    } catch (error) {
       const text = String(content).replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ');
       return text.substring(0, 100) + (text.length > 100 ? '...' : '');
    }
    return '';
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
          <p className="text-sm text-muted-foreground pt-2">
            {publishedAt ? format(new Date(publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : ''} por {authorName}
          </p>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{extractSummary(content)}</p>
          
          <div className="mt-4 flex flex-wrap gap-2">
            {(tags?.data && Array.isArray(tags.data)) ? (
                tags.data.map((tag) => (
                  <Badge key={tag.id} variant="secondary">{tag.attributes.name}</Badge>
                ))
            ) : null}
          </div>
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
