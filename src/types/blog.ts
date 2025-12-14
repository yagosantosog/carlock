export interface StrapiImageFormat {
  url: string;
}

export interface StrapiImageData {
  id: number;
  attributes: {
    alternativeText: string | null;
    url: string;
    formats?: {
      thumbnail: StrapiImageFormat;
      small: StrapiImageFormat;
      medium: StrapiImageFormat;
      large: StrapiImageFormat;
    };
  };
}

export interface StrapiAuthorData {
  id: number;
  attributes: {
    name: string;
  };
}

export interface SeoData {
    id: number;
    metaTitle: string;
    metaDescription: string;
    ogImage?: { data: StrapiImageData | null };
}

export interface PostAttributes {
  title: string;
  slug: string;
  content: any; // Can be a JSON string from Editor.js
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  tags?: { data: { id: number; attributes: { name: string } }[] } | null;
  author: {
    data: StrapiAuthorData | null;
  };
  coverImage: {
    data: StrapiImageData | null;
  };
  seo: SeoData | null;
}

export interface Post {
  id: number;
  attributes: PostAttributes;
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
