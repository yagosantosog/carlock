
import type { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com/api/blog-posts';

// Otimização: A query é a mesma, podemos defini-la uma vez.
// Popula o autor, a imagem da capa, as tags e o SEO.
const API_QUERY = '?populate[author]=true&populate[coverImage]=true&populate[tags]=true&populate[seo]=true&sort=publishedAt:desc';
const API_URL = `${STRAPI_URL}${API_QUERY}`;

/**
 * Busca todos os posts da API Strapi.
 * Executada no servidor e otimizada com cache.
 * @returns {Promise<Post[]>} Uma promessa que resolve para um array de posts.
 */
export async function getPosts(): Promise<Post[]> {
  try {
    // Usamos 'force-cache' para aproveitar o cache do Next.js.
    // Para revalidação, 'next: { revalidate: 3600 }' seria uma boa opção.
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
 * Filtra a partir dos posts já buscados para evitar requisições duplicadas.
 * @param {string} slug - O slug do post a ser encontrado.
 * @returns {Promise<Post | null>} Uma promessa que resolve para o post encontrado ou null.
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) {
    return null;
  }
  
  // Para buscar um post específico, buscamos todos e filtramos.
  // Isso é eficiente porque `getPosts` é cacheado pelo Next.js (se não usar 'no-store').
  // Se precisássemos buscar por slug diretamente, a URL seria:
  // const url = `${STRAPI_URL}?filters[slug][$eq]=${slug}&${API_QUERY}`;
  
  try {
    const posts = await getPosts();
    const post = posts.find((p) => p.slug === slug);
    return post || null;
  } catch (error) {
    console.error(`An error occurred while fetching post by slug (${slug}):`, error);
    return null;
  }
}
