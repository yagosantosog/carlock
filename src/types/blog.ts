
export interface StrapiImage {
  url: string;
  alternativeText?: string | null;
}

export interface StrapiAuthor {
  name: string;
}

export interface SeoData {
  metaTitle?: string;
  metaDescription?: string;
  ogImage?: StrapiImage;
}

export interface Post {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  content: any; // JSON string from Editor.js
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  coverImage?: StrapiImage;
  author?: StrapiAuthor;
  seo?: SeoData;
  tags?: { name: string }[];
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
