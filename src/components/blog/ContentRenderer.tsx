
import React from 'react';
import type { Post } from '@/types/blog';

// Interface para um bloco individual de conteúdo
interface Block {
  type: string;
  children: {
    type: string;
    text: string;
    // Adicione outras propriedades de `children` se necessário (bold, italic, etc.)
    [key: string]: any; 
  }[];
}

interface ContentRendererProps {
  content: Post['content'];
}

// Componente para renderizar um único bloco
const BlockRenderer: React.FC<{ block: Block }> = ({ block }) => {
  if (!block || !Array.isArray(block.children)) {
    return null;
  }

  // Concatena todos os textos dos filhos do bloco
  const text = block.children.map(child => child.text).join('');

  switch (block.type) {
    case 'paragraph':
      return <p className="mb-4">{text}</p>;
    
    // Adicione outros tipos de bloco aqui, como 'heading', 'list', etc.
    case 'heading':
      // Exemplo para cabeçalho, supondo que o nível está no bloco
      const level = (block as any).level || 1;
      const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;
      return <HeadingTag className="font-bold my-4">{text}</HeadingTag>;

    default:
      // Fallback para tipos de bloco não reconhecidos
      return <p className="mb-4">{text}</p>;
  }
};


export const ContentRenderer: React.FC<ContentRendererProps> = ({ content }) => {
  if (!content || !Array.isArray(content)) {
    return <p>Conteúdo indisponível.</p>;
  }

  return (
    <div>
      {content.map((block, index) => (
        <BlockRenderer key={index} block={block} />
      ))}
    </div>
  );
};
