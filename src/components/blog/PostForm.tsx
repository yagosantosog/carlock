'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { StrapiPost, StrapiPostForm } from '@/types/blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { slugify } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useToast } from '../ui/use-toast';
import { createPost, updatePost } from '@/lib/strapi';

const Editor = dynamic(() => import('./Editor').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <p>Carregando editor...</p>,
});

interface PostFormProps {
  post?: StrapiPost;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const { toast } = useToast();

  const defaultValues = post ? {
    title: post.attributes.title,
    slug: post.attributes.slug,
    content: post.attributes.content,
    author: post.attributes.author,
    tags: post.attributes.tags?.data.map(t => t.attributes.name).join(', ') || ''
  } : {
    title: '',
    slug: '',
    content: '',
    author: 'CarLock Admin',
    tags: ''
  };

  const { register, handleSubmit, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<StrapiPostForm>({
    defaultValues
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const title = watch('title');

  useEffect(() => {
    if (title && !post) { 
      setValue('slug', slugify(title));
    }
  }, [title, setValue, post]);

  const onSubmit = async (data: StrapiPostForm) => {
    try {
      const formData = new FormData();
      
      const postData: any = {
        title: data.title,
        slug: data.slug,
        content: data.content, // Already a string from the editor
        author: data.author,
        tags: data.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      };

      formData.append('data', JSON.stringify(postData));

      if (coverImageFile) {
        formData.append('files.coverImage', coverImageFile, coverImageFile.name);
      }

      if (post) {
        await updatePost(post.id, formData);
        toast({ title: "Post atualizado com sucesso!" });
      } else {
        await createPost(formData);
        toast({ title: "Post criado com sucesso!" });
      }

      router.push('/admin/blog');
      router.refresh();

    } catch (e: any) {
      console.error("Error saving post: ", e);
      toast({
        variant: "destructive",
        title: "Ocorreu um erro ao salvar.",
        description: e.message || 'Verifique os dados e tente novamente.',
      });
    }
  };

  let initialContent;
  if(post?.attributes.content) {
    try {
       initialContent = typeof post.attributes.content === 'string'
        ? JSON.parse(post.attributes.content)
        : post.attributes.content;
    } catch(e) {
      initialContent = {}; // Fallback for invalid JSON
    }
  }
  
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register('title', { required: 'Título é obrigatório' })} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register('slug', { required: 'Slug é obrigatório' })} />
         {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
      </div>
       <div>
        <Label htmlFor="author">Autor</Label>
        <Input id="author" {...register('author', { required: 'Autor é obrigatório' })} />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
      </div>
      <div>
        <Label htmlFor="coverImage">Imagem de Capa</Label>
        <Input id="coverImage" type="file" onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)} />
        {post?.attributes.coverImage.data && !coverImageFile && <img src={`${process.env.NEXT_PUBLIC_STRAPI_URL || ''}${post.attributes.coverImage.data.attributes.url}`} alt="Capa atual" className="mt-2 h-32 object-cover" />}
      </div>
      <div>
        <Label>Conteúdo</Label>
        <div className="mt-1 border rounded-md p-2 bg-background">
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Conteúdo é obrigatório' }}
            render={({ field }) => (
               <Editor
                value={initialContent}
                onChange={(data) => field.onChange(JSON.stringify(data))}
              />
            )}
          />
        </div>
         {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input 
          id="tags" 
          {...register('tags')}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : (post ? 'Atualizar Post' : 'Salvar Post')}
      </Button>
    </form>
  );
}
