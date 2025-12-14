import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Image from 'next/image';
import { Metadata } from 'next';
import { Badge } from '@/components/ui/badge';
import { ContentRenderer } from '@/components/blog/ContentRenderer';
import { Post } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';
const API_URL_BASE = `${STRAPI_URL}/api/blog-posts`;

// Função para buscar o post pelo slug
async function getPost(slug: string): Promise<Post | null> {
  const query = `?filters[slug][$eq]=${slug}&populate[author]=true&populate[coverImage]=true&populate[seo][populate][ogImage]=true`;
  const url = `${API_URL_BASE}${query}`;

  try {
    const res = await fetch(url, {
      next: { revalidate: 60 }
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch post: ${res.statusText}`);
    }

    const json = await res.json();
    if (json.data && json.data.length > 0) {
      return json.data[0] as Post;
    }
    return null;
  } catch (error) {
    console.error(`Error fetching post with slug ${slug}:`, error);
    return null;
  }
}

// Gerar metadados dinâmicos
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPost(params.slug);

  if (!post || !post.attributes.seo) {
    return {
      title: "Post não encontrado",
      description: "O post que você está procurando não existe ou foi movido."
    }
  }

  const { metaTitle, metaDescription, ogImage } = post.attributes.seo;
  const ogImageUrl = ogImage?.data?.attributes.url ? `${STRAPI_URL}${ogImage.data.attributes.url}` : undefined;

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

// Opcional: Gerar rotas estáticas no momento do build
export async function generateStaticParams() {
  try {
    const res = await fetch(`${API_URL_BASE}?fields[0]=slug`);
    if (!res.ok) return [];

    const { data } = await res.json();
    return data.map((post: { attributes: { slug: string } }) => ({
      slug: post.attributes.slug,
    }));
  } catch {
    return [];
  }
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getPost(params.slug);

  if (!post) {
    return <div className="container mx-auto py-10 text-center">Post não encontrado.</div>;
  }

  const { title, publishedAt, content, coverImage, author, tags } = post.attributes;

  const imageUrl = coverImage?.data?.attributes.url ? `${STRAPI_URL}${coverImage.data.attributes.url}` : null;
  const imageAlt = coverImage?.data?.attributes.alternativeText || title;
  const authorName = author?.data?.attributes.name || 'Autor Desconhecido';
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

      {tags?.data && tags.data.length > 0 && (
        <div className="mt-8 text-center">
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
