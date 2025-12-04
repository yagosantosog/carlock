'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { slugify } from '@/lib/utils';
import { useToast } from '../ui/use-toast';
import { Textarea } from '../ui/textarea';


interface PostFormValues {
    title: string;
    slug: string;
    content: string;
    author: string;
    tags: string; // comma-separated
}

export function PostForm() {
  const router = useRouter();
  const { toast } = useToast();

  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<PostFormValues>();
  
  const onSubmit = async (data: PostFormValues) => {
    toast({
      variant: "destructive",
      title: "Funcionalidade desabilitada.",
      description: 'A criação e edição de posts foi desativada.',
    });
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
        <Input id="coverImage" type="file" />
      </div>
      <div>
        <Label>Conteúdo</Label>
         <Textarea {...register('content')} placeholder="Escreva o conteúdo do post aqui."/>
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input 
          id="tags" 
          {...register('tags')}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Post'}
      </Button>
    </form>
  );
}
