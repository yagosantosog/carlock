
import { PostList } from '@/components/blog/PostList';
import { Post, PostApiResponse } from '@/types/blog';

const STRAPI_URL = 'https://wonderful-cat-191f5294ba.strapiapp.com';
const API_URL = `${STRAPI_URL}/api/blog-posts?populate[author]=true&populate[coverImage][fields][0]=url&populate[coverImage][fields][1]=alternativeText&populate[seo]=true&sort=publishedAt:desc`;

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(API_URL, {
      cache: 'no-store' // ou 'force-cache' com revalidate
    });

    if (!res.ok) {
      throw new Error(`Failed to fetch posts: ${res.statusText}`);
    }

    const json = await res.json() as PostApiResponse;
    return json.data;
  } catch (error) {
    console.error("Error fetching posts:", error);
    return [];
  }
}

export default async function BlogPage() {
  const posts = await getPosts();

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
