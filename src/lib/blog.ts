
import type { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com/api/blog-posts';

// Query que popula os campos necessários conforme a estrutura da API v5
const API_QUERY = '?populate[author]=true&populate[coverImage]=true&populate[tags]=true&populate[seo]=true&sort=publishedAt:desc';
const API_URL = `${STRAPI_URL}${API_QUERY}`;

/**
 * Busca todos os posts da API Strapi.
 * Executada no servidor e otimizada com cache.
 * @returns {Promise<Post[]>} Uma promessa que resolve para um array de posts.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      // Em caso de erro, retornamos um array vazio para não quebrar a página.
      return [];
    }

    const json = (await res.json()) as PostApiResponse;
    
    // A API retorna um objeto { data: [...] }, então retornamos a propriedade data.
    return json.data;
  } catch (error) {
    console.error('An error occurred while fetching posts:', error);
    return [];
  }
}

/**
 * Busca um único post pelo seu slug.
 * @param {string} slug - O slug do post a ser encontrado.
 * @returns {Promise<Post | null>} Uma promessa que resolve para o post encontrado ou null.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) {
    return null;
  }
  
  // Constrói a URL para buscar um post específico pelo slug
  const postApiUrl = `${STRAPI_URL}?filters[slug][$eq]=${slug}&${API_QUERY.substring(1)}`;

  try {
    const res = await fetch(postApiUrl, { cache: 'no-store' });

    if (!res.ok) {
        console.error(`Failed to fetch post by slug (${slug}): ${res.status} ${res.statusText}`);
        return null;
    }
    
    const json = (await res.json()) as PostApiResponse;
    
    // Se a busca retornar dados, pegamos o primeiro (e único) post
    if (json.data && json.data.length > 0) {
      return json.data[0];
    }
    
    return null;

  } catch (error) {
    console.error(`An error occurred while fetching post by slug (${slug}):`, error);
    return null;
  }
}
