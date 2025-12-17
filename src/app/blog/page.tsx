'use client';

import { useEffect, useState } from 'react';
import { PostList } from '@/components/blog/PostList';
import { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';
const API_URL = `${STRAPI_URL}/api/blog-posts?populate[author]=true&populate[coverImage]=true&populate[seo]=true&sort=publishedAt:desc`;

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(API_URL, {
      cache: 'no-store',
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const json = (await res.json()) as PostApiResponse;
    return json.data;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export default function BlogPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);
      
      // 1. Tentar obter do localStorage
      const cachedPosts = localStorage.getItem('blogPosts');
      if (cachedPosts) {
        try {
          const parsedPosts = JSON.parse(cachedPosts);
          setPosts(parsedPosts);
          setIsLoading(false);
          console.log("Posts carregados do localStorage.");
          return; // Para a execução se encontrou no cache
        } catch (e) {
            console.error("Erro ao analisar posts do localStorage, buscando na API.", e);
            localStorage.removeItem('blogPosts'); // Limpa cache inválido
        }
      }

      // 2. Se não estiver no cache, buscar na API
      console.log("Nenhum cache encontrado, buscando posts na API...");
      const fetchedPosts = await getPosts();
      
      // 3. Salvar na API
      if (fetchedPosts.length > 0) {
        localStorage.setItem('blogPosts', JSON.stringify(fetchedPosts));
        console.log("Posts salvos no localStorage.");
      }

      setPosts(fetchedPosts);
      setIsLoading(false);
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return <div className="container mx-auto py-10 px-4 text-center">Carregando posts...</div>;
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">Blog</h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Notícias, dicas e atualizações sobre segurança veicular.
        </p>
      </div>
      <PostList posts={posts} />
    </div>
  );
}
