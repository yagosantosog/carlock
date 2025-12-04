'use client';

import { PostList } from '@/components/blog/PostList';

export default function BlogPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notícias, dicas e atualizações sobre segurança veicular.
        </p>
      </div>
      <PostList posts={[]} />
    </div>
  );
}
