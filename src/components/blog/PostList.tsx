import { Post } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  isAdmin?: boolean; // isAdmin será sempre falso quando vier da API
}

export function PostList({ posts, isAdmin = false }: PostListProps) {
  if (posts.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhum post encontrado.</div>;
  }

  // A API Strapi retorna o tipo Post, enquanto o Firebase Admin retorna um tipo diferente.
  // O PostCard agora espera o tipo da API Strapi, então não é necessário mapear aqui.
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
