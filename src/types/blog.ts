
// Estrutura de dados alinhada com a resposta "achatada" da API Strapi v5

export interface StrapiImage {
  id: number;
  url: string;
  alternativeText: string | null;
}

export interface StrapiAuthor {
  id: number;
  name: string;
  bio: string | null;
}

export interface SeoData {
  id: number;
  metaTitle: string | null;
  metaDescription: string | null;
  ogImage?: StrapiImage | null;
}

export interface Tag {
    id: number;
    name: string;
}

export interface Post {
  id: number;
  title: string;
  slug: string;
  content: { type: string; children: { type: string; text: string }[] }[]; // Array de blocos Rich Text
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage: StrapiImage | null;
  author: StrapiAuthor | null;
  seo: SeoData | null;
  tags: Tag[];
}

export interface PostApiResponse {
  data: Post[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}
