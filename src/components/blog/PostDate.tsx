'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface PostDateProps {
  dateString: string;
}

export function PostDate({ dateString }: PostDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    if (dateString) {
      const date = new Date(dateString);
      setFormattedDate(format(date, "dd 'de' MMMM, yyyy", { locale: ptBR }));
    }
  }, [dateString]);

  // Render a placeholder or nothing on the server and initial client render
  if (!formattedDate) {
    return null; 
  }

  return <>{formattedDate}</>;
}
