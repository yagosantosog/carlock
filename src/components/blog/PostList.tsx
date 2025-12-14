import { Post, PostAttributes } from '@/types/blog';

import { PostCard } from './PostCard';

interface PostListProps {
  posts: any[]; // Aceita qualquer array para fazer a conversão
  isAdmin?: boolean;
}

// Função para mapear um post do Firebase para o formato Strapi
const mapFirebasePostToStrapi = (post: any): Post => {
  return {
    id: post.id,
    attributes: {
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      publishedAt: post.createdAt, // Firebase não tem 'publishedAt', usamos 'createdAt'
      tags: post.tags, // As tags já são um array de strings
      author: { data: null }, // Admin não mostra autor específico
      coverImage: { data: null, url: post.coverImage }, // Passa a URL direta se existir
    } as unknown as PostAttributes, // Força a tipagem pois alguns campos não batem 100%
  };
};

export function PostList({ posts, isAdmin = false }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhum post encontrado.</div>;
  }

  // Se for admin, mapeia os posts do Firebase para o formato Strapi.
  // Se não, assume que já está no formato correto da API.
  const formattedPosts = isAdmin ? posts.map(mapFirebasePostToStrapi) : posts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {formattedPosts.map((post) => (
        <PostCard key={post.id} post={post} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
