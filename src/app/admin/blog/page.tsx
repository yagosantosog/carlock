'use client';

import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PostList } from '@/components/blog/PostList';

export default function AdminBlogPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Blog Admin</h1>
        <Button asChild>
          <Link href="/admin/blog/new">Criar Novo Post</Link>
        </Button>
      </div>
      <PostList posts={[]} isAdmin />
    </div>
  );
}
