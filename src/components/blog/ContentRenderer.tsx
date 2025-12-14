import React from 'react';

// Define a interface para os dados de saída do Editor.js
interface OutputData {
  time: number;
  blocks: Block[];
  version: string;
}

interface Block {
  id: string;
  type: 'header' | 'paragraph' | 'list' | 'image' | 'quote';
  data: any;
}

interface ContentRendererProps {
  data: string; // JSON string from Editor.js
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ data }) => {
  let content: OutputData;
  try {
    // Tenta fazer o parse do conteúdo. Se falhar, mostra um erro.
    content = JSON.parse(data);
  } catch (error) {
    console.error("Failed to parse content JSON:", error);
    // Se o `data` for uma string simples, exibe-a dentro de um parágrafo
    if (typeof data === 'string') {
        return <p dangerouslySetInnerHTML={{ __html: data }}></p>;
    }
    return <p>Erro ao carregar o conteúdo do post.</p>;
  }

  if (!content || !Array.isArray(content.blocks)) {
    return <p>Conteúdo inválido ou vazio.</p>;
  }

  return (
    <div>
      {content.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            // Renderiza cabeçalhos (H1, H2, etc.)
            const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            return <HeaderTag key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }}></HeaderTag>;
          
          case 'paragraph':
            // Renderiza parágrafos
            return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
          
          case 'list':
            // Renderiza listas ordenadas ou não ordenadas
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={block.id} className="list-inside list-disc space-y-2">
                {block.data.items.map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ListTag>
            );

          case 'image':
            // Renderiza imagens
            return (
                <div key={block.id} className="my-4">
                    <img src={block.data.file.url} alt={block.data.caption || 'Imagem do post'} className="rounded-md shadow-md"/>
                    {block.data.caption && <p className="text-sm text-center text-muted-foreground mt-2">{block.data.caption}</p>}
                </div>
            )
          
          case 'quote':
            // Renderiza citações
            return (
                <blockquote key={block.id} className="border-l-4 border-primary pl-4 italic my-4">
                    <p dangerouslySetInnerHTML={{ __html: block.data.text }}></p>
                    {block.data.caption && <footer className="text-sm text-right mt-2">- {block.data.caption}</footer>}
                </blockquote>
            )

          default:
            // Retorna null para tipos de bloco não suportados
            return null;
        }
      })}
    </div>
  );
};
