export interface StrapiMediaFormat {
  name: string;
  hash: string;
  ext: string;
  mime: string;
  path: string | null;
  width: number;
  height: number;
  size: number;
  url: string;
}

export interface StrapiMedia {
  id: number;
  attributes: {
    name: string;
    alternativeText: string | null;
    caption: string | null;
    width: number;
    height: number;
    formats: {
      thumbnail: StrapiMediaFormat;
      small: StrapiMediaFormat;
      medium: StrapiMediaFormat;
      large: StrapiMediaFormat;
    };
    hash: string;
    ext: string;
    mime: string;
    size: number;
    url: string;
    previewUrl: string | null;
    provider: string;
    provider_metadata: any;
    createdAt: string;
    updatedAt: string;
  };
}

export interface StrapiTag {
  id: number;
  attributes: {
    name: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

export interface StrapiPostAttributes {
  title: string;
  slug: string;
  content: any; // Can be JSON string from Editor.js or Rich Text structure
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  coverImage: {
    data: StrapiMedia | null;
  };
  tags: {
    data: StrapiTag[];
  };
}

export interface StrapiPost {
  id: number;
  attributes: StrapiPostAttributes;
}

export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

// Simplified form data type
export interface StrapiPostForm {
    title: string;
    slug: string;
    content: string;
    author: string;
    tags: string; // comma-separated
}
