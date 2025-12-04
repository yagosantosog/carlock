'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Post } from '@/types/blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore } from '@/firebase';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { slugify } from '@/lib/utils';
import { OutputData } from '@editorjs/editorjs';
import dynamic from 'next/dynamic';

const Editor = dynamic(() => import('./Editor').then((mod) => mod.Editor), {
  ssr: false,
  loading: () => <p>Loading editor...</p>,
});

interface PostFormProps {
  post?: Post;
}

export function PostForm({ post }: PostFormProps) {
  const router = useRouter();
  const firestore = useFirestore();
  const { user } = useAuth();
  const storage = getStorage();
  const { register, handleSubmit, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<Post>({
    defaultValues: post || { tags: [], author: user?.displayName || 'Anônimo' }
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const title = watch('title');

  useEffect(() => {
    if (title && !post) { // Only auto-generate slug for new posts
      setValue('slug', slugify(title));
    }
  }, [title, setValue, post]);
  
  const onSubmit = async (data: Post) => {
    if (!firestore || !user) return;

    let coverImageUrl = post?.coverImage || '';

    if (coverImageFile) {
      const storageRef = ref(storage, `blog-covers/${Date.now()}_${coverImageFile.name}`);
      await uploadBytes(storageRef, coverImageFile);
      coverImageUrl = await getDownloadURL(storageRef);
    }
    
    const postData = {
      ...data,
      coverImage: coverImageUrl,
      updatedAt: serverTimestamp(),
      content: JSON.stringify(data.content)
    };

    try {
      if (post && post.id) {
        const postRef = doc(firestore, 'posts', post.id);
        await updateDoc(postRef, postData);
      } else {
        await addDoc(collection(firestore, 'posts'), {
          ...postData,
          createdAt: serverTimestamp(),
          author: user?.displayName || 'Anônimo'
        });
      }
      router.push('/admin/blog');
    } catch (e) {
      console.error("Error saving post: ", e);
      alert("Ocorreu um erro ao salvar. Tente novamente.");
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
        <Label htmlFor="coverImage">Imagem de Capa</Label>
        <Input id="coverImage" type="file" onChange={(e) => setCoverImageFile(e.target.files?.[0] || null)} />
        {post?.coverImage && !coverImageFile && <img src={post.coverImage} alt="Capa atual" className="mt-2 h-32 object-cover" />}
      </div>
      <div>
        <Label>Conteúdo</Label>
        <div className="mt-1 border rounded-md p-2 bg-background">
          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <Editor
                value={post?.content ? JSON.parse(post.content) : undefined}
                onChange={(data) => field.onChange(data)}
              />
            )}
          />
        </div>
      </div>
      <div>
        <Label htmlFor="tags">Tags (separadas por vírgula)</Label>
        <Input 
          id="tags" 
          {...register('tags')}
          onChange={(e) => setValue('tags', e.target.value.split(',').map(tag => tag.trim()))}
          defaultValue={Array.isArray(post?.tags) ? post.tags.join(', ') : ''}
        />
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Salvando...' : 'Salvar Post'}
      </Button>
    </form>
  );
}
