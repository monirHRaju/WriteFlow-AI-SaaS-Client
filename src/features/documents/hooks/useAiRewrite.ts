'use client';

import { useCallback, useState } from 'react';
import { Editor } from '@tiptap/react';
import { aiService } from '@/features/documents/services/ai.service';
import { RewriteMode } from '@/features/documents/types/document.types';

const POLL_INTERVAL_MS = 1500;
const MAX_POLL_ATTEMPTS = 60;

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const useAiRewrite = (editor: Editor | null) => {
  const [isRewriting, setIsRewriting] = useState(false);
  const [activeMode, setActiveMode] = useState<RewriteMode | null>(null);
  const [error, setError] = useState<string | null>(null);

  const rewrite = useCallback(
    async (mode: RewriteMode) => {
      if (!editor) return;

      const { from, to } = editor.state.selection;
      if (from === to) {
        setError('Select text to rewrite.');
        return;
      }

      const selectedText = editor.state.doc.textBetween(from, to, ' ');
      if (!selectedText.trim()) {
        setError('Selected text is empty.');
        return;
      }

      setIsRewriting(true);
      setActiveMode(mode);
      setError(null);

      try {
        const queueResponse = await aiService.rewrite(selectedText, mode);
        const jobId = queueResponse.data.jobId;

        for (let attempt = 0; attempt < MAX_POLL_ATTEMPTS; attempt++) {
          await sleep(POLL_INTERVAL_MS);
          const statusResponse = await aiService.getJobStatus(jobId);
          const { status, result } = statusResponse.data;

          if (status === 'completed' && result?.rewrittenText) {
            editor
              .chain()
              .focus()
              .deleteRange({ from, to })
              .insertContent(result.rewrittenText)
              .run();
            return;
          }

          if (status === 'failed') {
            throw new Error('Rewrite job failed.');
          }
        }

        throw new Error('Rewrite timed out. Please try again.');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Rewrite failed.');
      } finally {
        setIsRewriting(false);
        setActiveMode(null);
      }
    },
    [editor]
  );

  return { rewrite, isRewriting, activeMode, error };
};
