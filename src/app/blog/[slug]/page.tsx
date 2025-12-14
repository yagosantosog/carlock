
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';
const API_URL_BASE = `${STRAPI_URL}/api/blog-posts`;

async function getPostBySlug(slug: string): Promise<Post | null> {
  const query = `?filters[slug][$eq]=${slug}&populate[author]=true&populate[coverImage]=true&populate[seo][populate]=ogImage&populate[tags]=true`;
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

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não existe ou foi movido."
    };
  }

  const metaTitle = post.seo?.metaTitle || post.title;
  const metaDescription = post.seo?.metaDescription || '';
  
  const ogImageUrl = post.seo?.ogImage?.url 
    ? (post.seo.ogImage.url.startsWith('http') ? post.seo.ogImage.url : `${STRAPI_URL}${post.seo.ogImage.url}`)
    : (post.coverImage?.url ? (post.coverImage.url.startsWith('http') ? post.coverImage.url : `${STRAPI_URL}${post.coverImage.url}`) : undefined);

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: ogImageUrl ? [ogImageUrl] : [],
    },
  };
}

export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL_BASE}?fields[0]=slug`);
    if (!res.ok) return [];

    const { data } = await res.json() as PostApiResponse;
    return data.map((post) => ({
      slug: post.slug,
    }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug);

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
