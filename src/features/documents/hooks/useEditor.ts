'use client';

import { useEditor as useTiptapEditor, Editor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import CharacterCount from '@tiptap/extension-character-count';
import Highlight from '@tiptap/extension-highlight';
import Typography from '@tiptap/extension-typography';
import { SlashCommands } from '@/features/documents/components/editor/SlashCommands';

type UseEditorOptions = {
  content?: string;
  editable?: boolean;
  onUpdate?: (html: string) => void;
  onForceSave?: () => void;
};

export const useEditor = ({
  content = '',
  editable = true,
  onUpdate,
  onForceSave,
}: UseEditorOptions): { editor: Editor | null } => {
  const editor = useTiptapEditor({
    extensions: [
      StarterKit.configure({
        heading: { levels: [1, 2, 3] },
      }),
      Placeholder.configure({
        placeholder: "Type '/' for commands…",
      }),
      CharacterCount,
      Highlight,
      Typography,
      SlashCommands,
    ],
    content,
    editable,
    editorProps: {
      attributes: {
        class:
          'prose prose-invert max-w-none min-h-[400px] focus:outline-none px-4 py-3',
      },
      handleKeyDown: (_view, event) => {
        if ((event.ctrlKey || event.metaKey) && event.key === 's') {
          event.preventDefault();
          onForceSave?.();
          return true;
        }
        return false;
      },
    },
    onUpdate: ({ editor: ed }) => {
      onUpdate?.(ed.getHTML());
    },
  });

  return { editor };
};
