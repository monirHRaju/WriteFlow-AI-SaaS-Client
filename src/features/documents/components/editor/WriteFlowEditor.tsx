'use client';

import React, { useCallback, useState } from 'react';
import { EditorContent } from '@tiptap/react';
import { EditorToolbar } from '@/features/documents/components/editor/EditorToolbar';
import { AiRewriteMenu } from '@/features/documents/components/editor/AiRewriteMenu';
import { WordCount } from '@/features/documents/components/editor/WordCount';
import { AutosaveIndicator } from '@/features/documents/components/editor/AutosaveIndicator';
import { useEditor } from '@/features/documents/hooks/useEditor';
import { useAutosave } from '@/features/documents/hooks/useAutosave';

type WriteFlowEditorProps = {
  documentId: string;
  initialContent: string;
  title?: string;
};

export function WriteFlowEditor({ documentId, initialContent, title }: WriteFlowEditorProps) {
  const [content, setContent] = useState(initialContent);

  const { status, save } = useAutosave({
    documentId,
    content,
    title,
    enabled: true,
  });

  const handleForceSave = useCallback(() => {
    void save();
  }, [save]);

  const { editor } = useEditor({
    content: initialContent,
    onUpdate: setContent,
    onForceSave: handleForceSave,
  });

  return (
    <div className="rounded-lg border border-border bg-card/50 overflow-hidden">
      <EditorToolbar editor={editor} />
      <div className="relative min-h-[420px] bg-background/50">
        <EditorContent editor={editor} />
        <AiRewriteMenu editor={editor} />
      </div>
      <div className="flex items-center justify-between border-t border-border px-4 py-2">
        <WordCount editor={editor} />
        <AutosaveIndicator status={status} />
      </div>
    </div>
  );
}
