'use client';

import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { Post } from '@/types/blog';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PostList } from '@/components/blog/PostList';
import { Skeleton } from '@/components/ui/skeleton';
import { RequireAuth } from '@/components/RequireAuth';

export default function AdminBlogPage() {
  const firestore = useFirestore();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!firestore) return;

    const q = query(collection(firestore, 'posts'), orderBy('createdAt', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const postsData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Post));
      setPosts(postsData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [firestore]);

  return (
    <RequireAuth>
      <div className="container mx-auto py-10 px-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Blog Admin</h1>
          <Button asChild>
            <Link href="/admin/blog/new">Criar Novo Post</Link>
          </Button>
        </div>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex flex-col space-y-3">
                <Skeleton className="h-[225px] w-full rounded-xl" />
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <PostList posts={posts} isAdmin />
        )}
      </div>
    </RequireAuth>
  );
}
