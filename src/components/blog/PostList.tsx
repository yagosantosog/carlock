import { Post, PostAttributes } from '@/types/blog';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: any[]; 
  isAdmin?: boolean;
}

const mapFirebasePostToStrapi = (post: any): Post => {
  return {
    id: post.id,
    attributes: {
      title: post.title,
      slug: post.slug,
      content: post.content,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      publishedAt: post.createdAt, 
      tags: { data: post.tags?.map((t: string) => ({ id: t, attributes: { name: t } })) || [] },
      author: { data: { id: 1, attributes: { name: 'Admin' } } }, 
      coverImage: post.coverImage ? { data: { id: 1, attributes: { url: post.coverImage, alternativeText: post.title } } } : null,
      seo: null,
    } as unknown as PostAttributes,
  };
};

export function PostList({ posts, isAdmin = false }: PostListProps) {
  if (!posts || posts.length === 0) {
    return <div className="text-center text-muted-foreground">Nenhum post encontrado.</div>;
  }

  const formattedPosts = isAdmin ? posts.map(mapFirebasePostToStrapi) : posts;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {formattedPosts.map((post) => (
        <PostCard key={post.id} post={post} isAdmin={isAdmin} />
      ))}
    </div>
  );
}
