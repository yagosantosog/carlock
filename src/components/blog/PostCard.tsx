'use client';
import Link from 'next/link';
import Image from 'next/image';
import { Post } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { deleteDoc, doc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import { getStorage, ref, deleteObject } from 'firebase/storage';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { errorEmitter } from '@/firebase/error-emitter';
import { FirestorePermissionError } from '@/firebase/errors';
import { useToast } from '../ui/use-toast';

interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
}

export function PostCard({ post, isAdmin = false }: PostCardProps) {
  const firestore = useFirestore();
  const storage = getStorage();
  const { toast } = useToast();
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');

  const handleDelete = async () => {
    if (!firestore || !post.id) return;

    if (window.confirm(`Tem certeza que deseja deletar o post "${post.title}"?`)) {
      const postDocRef = doc(firestore, 'posts', post.id);

      try {
        // First, delete the cover image from Storage if it exists
        if (post.coverImage) {
          try {
            // Extract the path from the URL.
            // Firebase Storage URLs are typically in the format:
            // https://firebasestorage.googleapis.com/v0/b/your-project-id.appspot.com/o/folder%2FimageName.jpg?alt=media&token=...
            const pathRegex = /o\/(.+)\?alt=media/;
            const match = post.coverImage.match(pathRegex);
            
            if (match && match[1]) {
              const filePath = decodeURIComponent(match[1]); // Decode URL-encoded path
              const imageRef = ref(storage, filePath);
              await deleteObject(imageRef);
            } else {
              console.warn("Could not extract file path from image URL. The file may not be deleted from Storage.");
            }
          } catch (storageError) {
             console.error("Erro ao deletar a imagem de capa: ", storageError);
             toast({
              variant: "destructive",
              title: "Erro ao deletar imagem.",
              description: "Não foi possível deletar a imagem de capa do post, mas o post será deletado.",
             });
          }
        }

        // Then, delete the post document from Firestore
        await deleteDoc(postDocRef);

        toast({
          title: "Post deletado com sucesso!",
        });

      } catch (serverError: any) {
        // If Firestore deletion fails, emit a permission error
        const permissionError = new FirestorePermissionError({
          path: postDocRef.path,
          operation: 'delete',
        });
        errorEmitter.emit('permission-error', permissionError);
        // You might want to show a toast here as well for Firestore errors
        toast({
          variant: "destructive",
          title: "Erro ao deletar o post.",
          description: "Você não tem permissão para deletar este post.",
        });
      }
    }
  };
  
  const postUrl = isAdmin ? `/admin/blog/${post.id}/edit` : `/blog/${post.slug}`;
  const linkText = isAdmin ? 'Editar' : 'Ler Mais';

  const extractSummary = (content: any) => {
    try {
      const data = JSON.parse(content);
      const firstParagraph = data.blocks.find((block: any) => block.type === 'paragraph');
      return firstParagraph?.data.text.substring(0, 150) + '...' || '';
    } catch (e) {
      return '';
    }
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={postUrl}>
        <div className="relative w-full h-48">
          <Image
            src={post.coverImage || placeholder?.imageUrl || ''}
            alt={post.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="text-xl font-bold leading-snug">
          <Link href={postUrl} className="hover:text-primary transition-colors">
            {post.title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4">
          {post.createdAt && format(new Date(post.createdAt as string), "dd 'de' MMMM, yyyy", { locale: ptBR })} por {post.author}
        </p>
        {!isAdmin && <p className="text-sm text-muted-foreground">{extractSummary(post.content)}</p>}
         {post.tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        )}
      </CardContent>
      <CardFooter className="mt-auto">
        <div className="flex justify-between w-full">
            <Button asChild variant="default">
                <Link href={postUrl}>{linkText}</Link>
            </Button>
            {isAdmin && (
                <Button variant="destructive" onClick={handleDelete}>
                Deletar
                </Button>
            )}
        </div>
      </CardFooter>
    </Card>
  );
}
