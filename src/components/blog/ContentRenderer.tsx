import React from 'react';
import { OutputData } from '@editorjs/editorjs';

interface ContentRendererProps {
  data: string; // JSON string from Editor.js
}

export const ContentRenderer: React.FC<ContentRendererProps> = ({ data }) => {
  let content: OutputData;
  try {
    content = JSON.parse(data);
  } catch (error) {
    return <p>Erro ao carregar o conteúdo.</p>;
  }

  return (
    <div>
      {content.blocks.map((block) => {
        switch (block.type) {
          case 'header':
            const HeaderTag = `h${block.data.level}` as keyof JSX.IntrinsicElements;
            return <HeaderTag key={block.id}>{block.data.text}</HeaderTag>;
          case 'paragraph':
            return <p key={block.id} dangerouslySetInnerHTML={{ __html: block.data.text }}></p>;
          case 'list':
            const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
            return (
              <ListTag key={block.id}>
                {block.data.items.map((item: string, index: number) => (
                  <li key={index} dangerouslySetInnerHTML={{ __html: item }}></li>
                ))}
              </ListTag>
            );
          default:
            return null;
        }
      })}
    </div>
  );
};
