import Link from 'next/link';
import Image from 'next/image';
import { StrapiPost } from '@/types/blog';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Badge } from '../ui/badge';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { getStrapiURL } from '@/lib/utils';
import { deletePost } from '@/lib/strapi';
import { useToast } from '../ui/use-toast';

interface PostCardProps {
  post: StrapiPost;
  isAdmin?: boolean;
  onPostDeleted?: () => void;
}

export function PostCard({ post, isAdmin = false, onPostDeleted }: PostCardProps) {
  const placeholder = PlaceHolderImages.find(p => p.id === 'blog-post-placeholder');
  const { toast } = useToast();
  
  const { id, attributes } = post;
  const { title, slug, author, createdAt, coverImage, content, tags } = attributes;

  const handleDelete = async () => {
    if (!id) return;
    if (window.confirm(`Tem certeza que deseja deletar o post "${title}"?`)) {
      try {
        await deletePost(id.toString());
        toast({ title: 'Post deletado com sucesso!' });
        if(onPostDeleted) onPostDeleted();
      } catch (error) {
        console.error("Erro ao deletar o post: ", error);
        toast({
          variant: 'destructive',
          title: 'Ocorreu um erro ao deletar o post.',
          description: 'Tente novamente mais tarde.'
        });
      }
    }
  };
  
  const postUrl = isAdmin ? `/admin/blog/${id}/edit` : `/blog/${slug}`;
  const linkText = isAdmin ? 'Editar' : 'Ler Mais';
  
  const coverImageUrl = coverImage.data 
    ? getStrapiURL(coverImage.data.attributes.url) 
    : (placeholder?.imageUrl || '');

  const extractSummary = (content: any) => {
     try {
      if (typeof content === 'string') {
        const parsedContent = JSON.parse(content);
        const firstParagraph = parsedContent.blocks.find((block: any) => block.type === 'paragraph');
        let text = firstParagraph?.data.text;
        if(text) return text.substring(0, 150) + (text.length > 150 ? '...' : '');
      }
      return '';
    } catch (e) {
      console.error("Failed to parse content for summary", e);
      return '';
    }
    return '';
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
         {tags?.data && (
          <div className="mt-4 flex flex-wrap gap-2">
            {tags.data.map((tag) => (
              <Badge key={tag.id} variant="secondary">{tag.attributes.name}</Badge>
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
