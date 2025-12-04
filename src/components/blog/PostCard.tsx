import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { useToast } from '../ui/use-toast';

// Temporary simplified Post type
interface Post {
  id: string | number;
  title: string;
  slug: string;
  author: string;
  createdAt: string;
  coverImage?: { url: string };
  tags?: string[];
  content?: any;
}


interface PostCardProps {
  post: Post;
  isAdmin?: boolean;
  onPostDeleted?: () => void;
}

export function PostCard({ post, isAdmin = false, onPostDeleted }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  const { toast } = useToast();
  
  const { id, title, slug, author, createdAt, coverImage, tags, content } = post;

  const handleDelete = async () => {
    toast({ title: 'Função de deletar desabilitada.' });
  };
  
  const postUrl = isAdmin ? `/admin/blog/${id}/edit` : `/blog/${slug}`;
  const linkText = isAdmin ? 'Editar' : 'Ler Mais';
  
  const coverImageUrl = coverImage?.url || placeholder?.imageUrl || '';

  const extractSummary = (content: any) => {
    // This function will no longer work as intended without a proper content structure
    return "Clique para ler mais sobre este post...";
  };

  return (
    <Card className="flex flex-col h-full overflow-hidden transition-shadow duration-300 hover:shadow-lg">
      <Link href={postUrl}>
        <div className="relative w-full h-48">
          <Image
            src={coverImageUrl}
            alt={title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </Link>
      <CardHeader>
        <CardTitle className="text-xl font-bold leading-snug">
          <Link href={postUrl} className="hover:text-primary transition-colors">
            {title}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground text-sm mb-4">
          {createdAt && format(new Date(createdAt), "dd 'de' MMMM, yyyy", { locale: ptBR })} por {author}
        </p>
        {!isAdmin && <p className="text-sm text-muted-foreground">{extractSummary(content)}</p>}
         {tags && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
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
