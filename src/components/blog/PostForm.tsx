'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Post } from '@/types/blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useUser, useFirestore } from '@/firebase';
import { collection, addDoc, doc, updateDoc } from 'firebase/firestore';
import { slugify } from '@/lib/utils';
import dynamic from 'next/dynamic';
import { useToast } from '../ui/use-toast';

const Editor = dynamic(() => import('./Editor').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <p>Carregando editor...</p>,
});

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useUser();
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<Post>({
    defaultValues: post ? {
      ...post,
      tags: Array.isArray(post.tags) ? post.tags : (post.tags || '').split(',').map(s => s.trim())
    } : { tags: [] }
  });
  
  const title = watch('title');

  useEffect(() => {
    if (title && !post) { 
      setValue('slug', slugify(title));
    }
  }, [title, setValue, post]);

  const onSubmit = async (data: Post) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação.",
        description: "Você precisa estar logado para salvar um post.",
      });
      return;
    }

    try {
      const normalizedTags = Array.isArray(data.tags)
        ? data.tags.map(t => String(t).trim()).filter(Boolean)
        : (typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);

      const contentString = typeof data.content === 'object' && data.content !== null
        ? JSON.stringify(data.content)
        : String(data.content || '');

      const postData: any = {
        ...data,
        title: String(data.title || ''),
        slug: String(data.slug || ''),
        content: contentString,
        author: user.uid,
        tags: normalizedTags,
        updatedAt: new Date().toISOString(),
      };

      if (post && post.id) {
        const postRef = doc(firestore, 'posts', post.id);
        await updateDoc(postRef, postData);
      } else {
        const collectionRef = collection(firestore, 'posts');
        postData.createdAt = new Date().toISOString();
        const docRef = await addDoc(collectionRef, postData);
        await updateDoc(docRef, { id: docRef.id });
      }

      toast({
        title: "Post salvo com sucesso!",
      });

      router.push('/admin/blog');
      router.refresh();

    } catch (e: any) {
      console.error("Error saving post: ", e);
      toast({
        variant: "destructive",
        title: "Ocorreu um erro ao salvar.",
        description: `${e?.code || ''} ${e?.message || String(e)}`,
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <Label htmlFor="title">Título</Label>
        <Input id="title" {...register('title', { required: 'Título é obrigatório' })} />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
      </div>
      <div>
        <Label htmlFor="slug">Slug</Label>
        <Input id="slug" {...register('slug', { required: 'Slug é obrigatório' })} readOnly />
      </div>
      <div>
        <Label>Conteúdo</Label>
        <div className="mt-1 border rounded-md p-2 bg-background">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
               <Editor
                value={post?.content && typeof post.content === 'string' ? JSON.parse(post.content) : undefined}
                onChange={(data) => field.onChange(JSON.stringify(data))}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Controller
          name="tags"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <Input 
              id="tags" 
              value={Array.isArray(field.value) ? field.value.join(', ') : ''}
              onChange={(e) => {
                const tags = e.target.value.split(',').map(tag => tag.trim());
                field.onChange(tags);
              }}
            />
          )}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Post'}
      </Button>
    </form>
  );
}
