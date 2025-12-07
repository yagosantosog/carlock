'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { deleteDoc, doc, getDoc } from 'firebase/firestore';
import { useFirestore, useUser } from '@/firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '../ui/use-toast';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/types/user';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

function AuthorDisplay({ authorId }: { authorId: string }) {
  const firestore = useFirestore();
  const [author, setAuthor] = useState<UserProfile | null>(null);

  useEffect(() => {
    if (!firestore || !authorId) return;
    const fetchAuthor = async () => {
      const userRef = doc(firestore, 'users', authorId);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        setAuthor(userSnap.data() as UserProfile);
      }
    };
    fetchAuthor();
  }, [firestore, authorId]);

  return <>{author ? author.username : 'Carregando...'}</>;
}


export function PostCard({ post, isAdmin = false }: PostCardProps) {
  const firestore = useFirestore();
  const { user } = useUser();
  const storage = getStorage();
  const { toast } = useToast();
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); // Impede a navegação ao clicar no botão de deletar
    if (!firestore || !post.id) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível deletar o post. Instância do Firestore ou ID do post ausente.",
      });
      return;
    }

    if (window.confirm(`Tem certeza que deseja deletar o post "${post.title}"?`)) {
      const postDocRef = doc(firestore, 'posts', post.id);

      // Delete cover image from Storage if it exists
      if (post.coverImage && post.coverImage.includes('firebasestorage.googleapis.com')) {
        try {
          const imageRef = ref(storage, post.coverImage);
          await deleteObject(imageRef);
        } catch (storageError: any) {
           if (storageError.code !== 'storage/object-not-found') {
              console.error("Erro ao deletar a imagem de capa: ", storageError);
              toast({
                variant: "destructive",
                title: "Erro ao deletar imagem.",
                description: "Não foi possível deletar a imagem de capa, mas a exclusão do post continuará.",
              });
           }
        }
      }

      deleteDoc(postDocRef)
        .then(() => {
          toast({
            title: "Post deletado com sucesso!",
          });
        })
        .catch((serverError) => {
          const permissionError = new FirestorePermissionError({
            path: postDocRef.path,
            operation: 'delete',
          });
          errorEmitter.emit('permission-error', permissionError);
          toast({
            variant: "destructive",
            title: "Erro de permissão",
            description: "Você não tem permissão para deletar este post.",
          });
        });
    }
  };
  
  const postUrl = isAdmin ? `/admin/blog/${post.id}/edit` : `/blog/${post.slug}`;

  const extractSummary = (content: any) => {
    try {
      if (typeof content === 'string') {
        const data = JSON.parse(content);
        const firstParagraph = data.blocks.find((block: any) => block.type === 'paragraph');
        return firstParagraph?.data.text.substring(0, 150) + '...' || '';
      }
      return '';
    } catch (e) {
      return '';
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
       <Link href={postUrl} className="flex flex-col h-full">
        <div className="relative w-full h-48">
          <Image
            src={post.coverImage || placeholder?.imageUrl || ''}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <CardHeader>
          <CardTitle className="text-xl font-bold leading-snug">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-muted-foreground text-sm mb-4">
            {post.createdAt && format(new Date(post.createdAt as string), "dd 'de' MMMM, yyyy", { locale: ptBR })} por <AuthorDisplay authorId={post.author as string} />
          </p>
          {!isAdmin && <p className="text-sm text-muted-foreground">{extractSummary(post.content)}</p>}
          {post.tags && Array.isArray(post.tags) && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <Badge key={tag} variant="secondary">{tag}</Badge>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="mt-auto">
          {isAdmin ? (
             <div className="flex justify-between w-full">
                <Button asChild variant="default">
                    <Link href={postUrl}>Editar</Link>
                </Button>
                {user?.uid === post.author && (
                    <Button variant="destructive" onClick={handleDelete}>
                    Deletar
                    </Button>
                )}
            </div>
          ) : (
             <Button asChild variant="default">
                <p>Ler Mais</p>
            </Button>
          )}
        </CardFooter>
      </Link>
    </Card>
  );
}
