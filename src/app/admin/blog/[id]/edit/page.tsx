'use client';

import { PostForm } from '@/components/blog/PostForm';
import { Skeleton } from '@/components/ui/skeleton';

export default function EditPostPage({ params }: { params: { id: string } }) {

  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
      <p>Funcionalidade de edição desabilitada.</p>
    </div>
  );
}
