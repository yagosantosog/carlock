'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, Controller } from 'react-hook-form';
import { Post } from '@/types/blog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useAuth, useFirestore, errorEmitter } from '@/firebase';
import { FirestorePermissionError } from '@/firebase/errors';
import { collection, addDoc, doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { slugify } from '@/lib/utils';
import { OutputData } from '@editorjs/editorjs';
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
  const { user } = useAuth();
  const storage = getStorage();
  const { toast } = useToast();

  const { register, handleSubmit, setValue, watch, control, formState: { errors, isSubmitting } } = useForm<Post>({
    defaultValues: post || { tags: [] }
  });
  const [coverImageFile, setCoverImageFile] = useState<File | null>(null);

  const title = watch('title');

  useEffect(() => {
    if (title && !post) { // Only auto-generate slug for new posts
      setValue('slug', slugify(title));
    }
  }, [title, setValue, post]);

  // Set author when user object is available
  useEffect(() => {
    if (user && !post?.author) {
      setValue('author', user.isAnonymous ? 'Anônimo' : user.displayName || 'Anônimo');
    }
  }, [user, post, setValue]);
  
  const onSubmit = async (data: Post) => {
    if (!firestore || !user) {
      toast({
        variant: "destructive",
        title: "Erro de autenticação.",
        description: "Por favor, recarregue a página e tente novamente.",
      });
      return;
    }

    try {
      let coverImageUrl = post?.coverImage || undefined;

      if (coverImageFile) {
        const storageRef = ref(storage, `blog-covers/${Date.now()}_${coverImageFile.name}`);
        await uploadBytes(storageRef, coverImageFile);
        coverImageUrl = await getDownloadURL(storageRef);
      }
      
      const normalizedTags = Array.isArray(data.tags)
        ? data.tags.map(t => String(t).trim()).filter(Boolean)
        : (typeof data.tags === 'string' ? data.tags.split(',').map(tag => tag.trim()).filter(Boolean) : []);

      const contentString = typeof data.content === 'object'
        ? JSON.stringify(data.content)
        : String(data.content || '');

      const nowIso = new Date().toISOString();

      const postData: any = {
        title: String(data.title || ''),
        slug: String(data.slug || ''),
        content: contentString,
        author: String(data.author || (user.isAnonymous ? 'Anônimo' : user.displayName || 'Anônimo')),
        tags: normalizedTags,
        updatedAt: nowIso,
      };

      if (coverImageUrl) {
        postData.coverImage = coverImageUrl;
      }


      if (post && post.id) {
        const postRef = doc(firestore, 'posts', post.id);
        updateDoc(postRef, postData).catch(error => {
            errorEmitter.emit(
              'permission-error',
              new FirestorePermissionError({
                path: postRef.path,
                operation: 'update',
                requestResourceData: postData,
              })
            )
        });
      } else {
        const collectionRef = collection(firestore, 'posts');
        addDoc(collectionRef, {
          ...postData,
          createdAt: nowIso,
        }).catch(error => {
            errorEmitter.emit(
              'permission-error',
              new FirestorePermissionError({
                path: collectionRef.path,
                operation: 'create',
                requestResourceData: { ...postData, createdAt: nowIso },
              })
            )
        });
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
