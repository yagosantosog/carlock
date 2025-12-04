import { PostCard } from './PostCard';

// Temporary simplified Post type
interface Post {
  id: string | number;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  coverImage?: { url: string };
  tags?: string[];
  content?: any;
}


interface PostListProps {
  posts: Post[];
  isAdmin?: boolean;
  onPostDeleted?: () => void;
}

export function PostList({ posts, isAdmin = false, onPostDeleted }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhum post encontrado.</div>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} isAdmin={isAdmin} onPostDeleted={onPostDeleted} />
      ))}
    </div>
  );
}
