import { StrapiPost, StrapiResponse } from "@/types/blog";
import { getStrapiURL } from "./utils";
import qs from 'qs';

async function fetchAPI(path: string, urlParamsObject = {}, options = {}) {
  try {
    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
      },
      ...options,
    };
    const queryString = qs.stringify(urlParamsObject);
    const requestUrl = `${getStrapiURL(`/api${path}${queryString ? `?${queryString}` : ''}`)}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(`Error fetching from Strapi: ${path}`);
  }
}

export async function getPosts(): Promise<StrapiPost[]> {
  const { data } = await fetchAPI('/posts', { populate: '*' }) as StrapiResponse<StrapiPost[]>;
  return data;
}

export async function getPostBySlug(slug: string): Promise<StrapiPost | null> {
    const { data } = await fetchAPI('/posts', {
        filters: { slug: { $eq: slug } },
        populate: '*'
    }) as StrapiResponse<StrapiPost[]>;
    if (data && data.length > 0) {
        return data[0];
    }
    return null;
}

export async function getPostById(id: string): Promise<StrapiPost | null> {
    const { data } = await fetchAPI(`/posts/${id}`, { populate: '*' }) as StrapiResponse<StrapiPost>;
    return data;
}

export async function createPost(formData: FormData) {
  const response = await fetch(getStrapiURL('/api/posts'), {
    method: 'POST',
    body: formData,
    // Don't set Content-Type header, browser will set it with boundary
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error('Strapi error:', errorData.error);
    throw new Error(errorData.error?.message || 'Failed to create post');
  }

  return response.json();
}

export async function updatePost(id: number, formData: FormData) {
    const url = getStrapiURL(`/api/posts/${id}`);
    
    const response = await fetch(url, {
        method: 'PUT',
        body: formData,
         // Don't set Content-Type header for multipart/form-data
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi error:', errorData.error);
        throw new Error(errorData.error?.message || 'Failed to update post');
    }

    return response.json();
}

export async function deletePost(id: string) {
    const response = await fetch(getStrapiURL(`/api/posts/${id}`), {
        method: 'DELETE',
    });

    if (!response.ok) {
        const errorData = await response.json();
        console.error('Strapi error:', errorData.error);
        throw new Error(errorData.error?.message || 'Failed to delete post');
    }

    return response.json();
}
