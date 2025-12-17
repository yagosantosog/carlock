
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';

interface PostCardProps {
  post: Post;
}

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';

// Função para extrair um resumo simples do conteúdo
const extractSummary = (content: Post['content']): string => {
    if (!content || !Array.isArray(content)) return '';
    
    // Encontra o primeiro bloco do tipo "paragraph"
    const firstParagraph = content.find(block => block.type === 'paragraph');
    
    if (firstParagraph && Array.isArray(firstParagraph.children)) {
      // Concatena o texto de todos os filhos do parágrafo
      const text = firstParagraph.children.map(child => child.text).join(' ');
      return text.replace(/&nbsp;|<[^>]+>/g, ' ').trim();
    }
    
    return '';
};


export function PostCard({ post }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  
  if (!post) {
    return null;
  }
  
  const { slug, title, publishedAt, coverImage, author, content, tags } = post;

  const postUrl = `/blog/${slug}`;

  // Constrói a URL da imagem, tratando URLs relativas e absolutas
  const getImageUrl = () => {
    if (coverImage?.url) {
      return coverImage.url.startsWith('http') ? coverImage.url : `${STRAPI_URL}${coverImage.url}`;
    }
    return placeholder?.imageUrl; // Fallback para placeholder
  };
  
  const imageUrl = getImageUrl();
  const imageAlt = coverImage?.alternativeText || title;
  const authorName = author?.name || 'Autor Desconhecido';
  const formattedDate = publishedAt ? format(new Date(publishedAt), "dd 'de' MMMM, yyyy", { locale: ptBR }) : '';

  return (
    <Link href={postUrl} className="group h-full flex" prefetch={true}>
        <Card className="flex flex-col h-full w-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
        {imageUrl && (
            <div className="relative w-full h-48">
            <Image
                src={imageUrl}
                alt={imageAlt}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            </div>
        )}
        <CardHeader>
            <CardTitle className="text-xl font-bold leading-snug line-clamp-2">
            {title}
            </CardTitle>
            <p className="text-sm text-muted-foreground pt-2">
                {formattedDate} por {authorName}
            </p>
        </CardHeader>
        <CardContent className="flex-grow">
            <p className="text-sm text-muted-foreground line-clamp-3">{extractSummary(content)}</p>
            
            {tags && tags.length > 0 && (
                 <div className="mt-4 flex flex-wrap gap-2">
                    {tags.slice(0, 3).map((tag) => (
                        <Badge key={tag.id} variant="secondary">{tag.name}</Badge>
                    ))}
                </div>
            )}
        </CardContent>
        <CardFooter className="mt-auto">
            <div className="w-full text-primary font-semibold group-hover:underline">
                Ler Mais &rarr;
            </div>
        </CardFooter>
        </Card>
    </Link>
  );
}
