
import { getPosts } from '@/lib/blog';
import { PostList } from '@/components/blog/PostList';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Blog | CarLock',
    description: 'Notícias, dicas e atualizações sobre segurança veicular e tecnologia de rastreamento.',
};

// Este é um Server Component, executado no servidor.
export default async function BlogPage() {
  // 1. Buscar os posts no servidor
  const posts = await getPosts();

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notícias, dicas e atualizações sobre segurança veicular.
        </p>
      </div>
      {/* 2. Passar os posts para o componente de lista */}
      <PostList posts={posts} />
    </div>
  );
}
