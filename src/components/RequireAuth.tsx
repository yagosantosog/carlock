'use client';

import React, { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/firebase/provider';
import { Skeleton } from './ui/skeleton';

export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login');
    }
  }, [loading, user, router]);

  if (loading) {
    return (
       <div className="container mx-auto py-10 px-4 space-y-4">
        <Skeleton className="h-10 w-1/2" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-20 w-full" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-10 w-32" />
      </div>
    );
  }
  
  if (!user) {
    return null; // ou uma tela de redirecionamento
  }

  return <>{children}</>;
}
