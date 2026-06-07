'use client';

import React from 'react';
import { BubbleMenu, Editor } from '@tiptap/react';
import { Loader2, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAiRewrite } from '@/features/documents/hooks/useAiRewrite';
import { RewriteMode } from '@/features/documents/types/document.types';

type AiRewriteMenuProps = {
  editor: Editor | null;
};

const REWRITE_OPTIONS: { label: string; mode: RewriteMode }[] = [
  { label: 'Shorten', mode: 'shorten' },
  { label: 'Expand', mode: 'expand' },
  { label: 'Formal', mode: 'formal' },
  { label: 'Casual', mode: 'casual' },
  { label: 'Fix Grammar', mode: 'fix_grammar' },
];

export function AiRewriteMenu({ editor }: AiRewriteMenuProps) {
  const { rewrite, isRewriting, activeMode, error } = useAiRewrite(editor);

  if (!editor) return null;

  return (
    <BubbleMenu
      editor={editor}
      tippyOptions={{ duration: 100, placement: 'top' }}
      shouldShow={({ editor: ed }) => !ed.state.selection.empty}
    >
      <div className="flex flex-col gap-1 rounded-lg border border-border bg-popover p-2 shadow-lg">
        <div className="flex items-center gap-1 px-1 pb-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3 w-3" />
          AI Rewrite
        </div>
        <div className="flex flex-wrap gap-1">
          {REWRITE_OPTIONS.map(({ label, mode }) => (
            <Button
              key={mode}
              type="button"
              size="sm"
              variant="secondary"
              disabled={isRewriting}
              className="h-7 text-xs"
              onClick={() => void rewrite(mode)}
            >
              {isRewriting && activeMode === mode ? (
                <Loader2 className="mr-1 h-3 w-3 animate-spin" />
              ) : null}
              {label}
            </Button>
          ))}
        </div>
        {isRewriting && (
          <p className="px-1 text-xs text-muted-foreground">Rewriting selection…</p>
        )}
        {error && <p className="px-1 text-xs text-destructive">{error}</p>}
      </div>
    </BubbleMenu>
  );
}
