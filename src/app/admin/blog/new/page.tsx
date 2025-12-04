import { PostForm } from '@/components/blog/PostForm';

export default function NewPostPage() {
  return (
    <div className="container mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold mb-8">Criar Novo Post</h1>
      <PostForm />
    </div>
  );
}
