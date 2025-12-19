export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import type { Metadata } from "next";

import { getPostBySlug } from "@/lib/blog";
import { ContentRenderer } from "@/components/blog/ContentRenderer";

const STRAPI_URL = "https://wonderful-cat-191f5294ba.strapiapp.com";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

/**
 * SEO dinâmico por post (Next 15)
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;

  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: "Post não encontrado",
      description: "Este conteúdo não está disponível.",
    };
  }

  const title = post.seo?.metaTitle || post.title;
  const description =
    post.seo?.metaDescription || "Leia este artigo no nosso blog.";

  const imageUrl = post.coverImage?.url
    ? post.coverImage.url.startsWith("http")
      ? post.coverImage.url
      : `${STRAPI_URL}${post.coverImage.url}`
    : undefined;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      images: imageUrl ? [imageUrl] : [],
    },
  };
}

/**
 * Página do post (Next 15)
 */
export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;

  if (!slug) {
    notFound();
  }

  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const { title, content, publishedAt, coverImage, author } = post;

  const imageUrl = coverImage?.url
    ? coverImage.url.startsWith("http")
      ? coverImage.url
      : `${STRAPI_URL}${coverImage.url}`
    : null;

  const imageAlt = coverImage?.alternativeText || title;

  const formattedDate = publishedAt
    ? format(new Date(publishedAt), "dd 'de' MMMM 'de' yyyy", {
        locale: ptBR,
      })
    : null;

  return (
    <article className="container mx-auto max-w-4xl px-4 py-10">
      {/* Título */}
      <header className="mb-8">
        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
          {title}
        </h1>

        {formattedDate && (
          <p className="text-sm text-muted-foreground">{formattedDate}</p>
        )}
      </header>

      {/* Imagem de capa */}
      {imageUrl && (
        <div className="relative w-full h-64 md:h-96 mb-10 rounded-lg overflow-hidden">
          <Image
            src={imageUrl}
            alt={imageAlt}
            fill
            className="object-cover"
            priority
          />
        </div>
      )}

      {/* Autor */}
      {author?.name && (
        <div className="mb-10 text-sm text-muted-foreground">
          <p className="font-semibold">{author.name}</p>
          {author.bio && <p className="italic">{author.bio}</p>}
        </div>
      )}

      {/* Conteúdo */}
      <section className="prose prose-lg dark:prose-invert max-w-none">
        <ContentRenderer content={content} />
      </section>
    </article>
  );
}
