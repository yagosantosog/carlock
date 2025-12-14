import { Post } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
  isAdmin?: boolean;
}

export function PostList({ posts, isAdmin = false }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhum post encontrado.</div>;
  }

  // A lógica de conversão foi removida. Os dados da API já estão no formato correto.
  // E para o modo admin, os dados do Firebase serão tratados separadamente.
  const postsToRender = isAdmin 
    ? posts.map(post => ({ // Garante um formato mínimo para o admin
        id: post.id,
        attributes: post as any,
      }))
    : posts;


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {postsToRender.map((post) => (
        <PostCard key={post.id} post={post} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
