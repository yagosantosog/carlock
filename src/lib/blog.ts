import type { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com/api/blog-posts';

// Query correta para Strapi v5
const POPULATE_QUERY =
  'populate[author]=true' +
  '&populate[seo]=true' +
  '&populate[coverImage][fields][0]=url' +
  '&populate[coverImage][fields][1]=alternativeText' +
  '&sort=publishedAt:desc';

const API_URL = `${STRAPI_URL}?${POPULATE_QUERY}`;

/**
 * Busca todos os posts
 */
export async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(API_URL, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch posts: ${res.status} ${res.statusText}`);
      return [];
    }

    const json = (await res.json()) as PostApiResponse;
    return json.data ?? [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Busca um post pelo slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  if (!slug) return null;

  const postApiUrl =
    `${STRAPI_URL}?filters[slug][$eq]=${encodeURIComponent(slug)}&${POPULATE_QUERY}`;

  try {
    const res = await fetch(postApiUrl, { cache: 'no-store' });

    if (!res.ok) {
      console.error(`Failed to fetch post (${slug}): ${res.status} ${res.statusText}`);
      return null;
    }

    const json = (await res.json()) as PostApiResponse;
    return json.data?.[0] ?? null;
  } catch (error) {
    console.error(`Error fetching post (${slug}):`, error);
    return null;
  }
}
