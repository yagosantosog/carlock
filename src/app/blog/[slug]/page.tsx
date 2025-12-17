
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import type { Metadata } from 'next';

import { getPostBySlug, getPosts } from '@/lib/blog';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { Badge } from '@/components/ui/badge';

const STRAPI_URL = 'https://efficient-nature-699917a2c3.strapiapp.com';

type Props = {
  params: { slug: string };
};

// Geração de metadados dinâmicos para SEO
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: 'Post Não Encontrado',
    };
  }
  
  const seoTitle = post.seo?.metaTitle || post.title;
  const seoDescription = post.seo?.metaDescription || 'Leia mais sobre este post.';
  const ogImageUrl = post.coverImage?.url ? (post.coverImage.url.startsWith('http') ? post.coverImage.url : `${STRAPI_URL}${post.coverImage.url}`) : undefined;

  return {
    title: seoTitle,
    description: seoDescription,
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

// Pré-renderiza todas as páginas de posts no momento da compilação
export async function generateStaticParams() {
  const posts = await getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Este é um Server Component
export default async function PostPage({ params }: Props) {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    notFound(); // Retorna uma página 404 se o post não for encontrado
  }

  const { title, publishedAt, content, coverImage, author, tags } = post;
  
  const imageUrl = coverImage?.url ? (coverImage.url.startsWith('http') ? coverImage.url : `${STRAPI_URL}${coverImage.url}`) : null;
  const imageAlt = coverImage?.alternativeText || title;
  const authorName = author?.name || 'Autor Desconhecido';
  const authorBio = author?.bio;
  const formattedDate = publishedAt ? format(new Date(publishedAt), "dd 'de' MMMM 'de' yyyy", { locale: ptBR }) : '';

  return (
    <article className="container mx-auto py-10 px-4 max-w-4xl">
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">{title}</h1>
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

      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center text-sm text-muted-foreground">
          <div className="mb-4 sm:mb-0">
            <p className="font-semibold">{authorName}</p>
            {authorBio && <p className="italic">{authorBio}</p>}
          </div>
          <p>{formattedDate}</p>
      </div>

      <div className="prose prose-lg dark:prose-invert max-w-none mx-auto">
        <ContentRenderer content={content} />
      </div>

      {tags && tags.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Tags:</h3>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <Badge key={tag.id} variant="secondary">
                  {tag.name}
                </Badge>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}
