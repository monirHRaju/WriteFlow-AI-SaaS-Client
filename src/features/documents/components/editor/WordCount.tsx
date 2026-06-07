'use client';

import React, { useEffect, useState } from 'react';
import { Editor } from '@tiptap/react';

type WordCountProps = {
  editor: Editor | null;
};

export function WordCount({ editor }: WordCountProps) {
  const [words, setWords] = useState(0);
  const [characters, setCharacters] = useState(0);

  useEffect(() => {
    if (!editor) return;

    const updateCounts = () => {
      setWords(editor.storage.characterCount.words());
      setCharacters(editor.storage.characterCount.characters());
    };

    updateCounts();
    editor.on('update', updateCounts);

    return () => {
      editor.off('update', updateCounts);
    };
  }, [editor]);

  return (
    <p className="text-xs text-muted-foreground">
      {words} words · {characters} characters
    </p>
  );
}
