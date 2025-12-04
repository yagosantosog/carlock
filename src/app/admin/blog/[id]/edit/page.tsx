'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { PostForm } from '@/components/blog/PostForm';
import { Post } from '@/types/blog';
import { Skeleton } from '@/components/ui/skeleton';
import { RequireAuth } from '@/components/RequireAuth';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const firestore = useFirestore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore || !params.id) return;

    const fetchPost = async () => {
      const docRef = doc(firestore, 'posts', params.id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setPost({ id: docSnap.id, ...docSnap.data() } as Post);
      }
      setLoading(false);
    };

    fetchPost();
  }, [firestore, params.id]);

  if (loading) {
    return (
      <div className="container mx-auto py-10 px-4">
        <div className="space-y-4">
          <Skeleton className="h-10 w-1/2" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    )
  }

  if (!post) {
    return <div className="container mx-auto py-10">Post não encontrado.</div>;
  }

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <h1 className="text-3xl font-bold mb-8">Editar Post</h1>
        <PostForm post={post} />
      </div>
    </RequireAuth>
  );
}
