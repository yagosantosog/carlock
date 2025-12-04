import React, { useEffect, useRef } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import List from '@editorjs/list';
import Paragraph from '@editorjs/paragraph';

interface EditorProps {
  onChange: (data: OutputData) => void;
  value?: OutputData;
}

export const Editor: React.FC<EditorProps> = ({ onChange, value }) => {
  const editorRef = useRef<EditorJS | null>(null);
  const holderId = `editorjs-${Math.random().toString(36).substring(7)}`;

  useEffect(() => {
    if (!editorRef.current) {
      const editor = new EditorJS({
        holder: holderId,
        tools: {
          header: Header,
          list: List,
          paragraph: {
            class: Paragraph,
            inlineToolbar: true,
          },
        },
        data: value,
        async onChange(api) {
          const data = await api.saver.save();
          onChange(data);
        },
        placeholder: 'Comece a escrever sua história...',
      });
      editorRef.current = editor;
    }

    return () => {
      if (editorRef.current && editorRef.current.destroy) {
        editorRef.current.destroy();
        editorRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div id={holderId} className="prose dark:prose-invert max-w-full" />;
};
