'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { documentsService } from '@/features/documents/services/documents.service';

export type AutosaveStatus = 'saved' | 'unsaved' | 'saving' | 'error';

type UseAutosaveOptions = {
  documentId: string;
  content: string;
  title?: string;
  enabled?: boolean;
};

export const useAutosave = ({
  documentId,
  content,
  title,
  enabled = true,
}: UseAutosaveOptions) => {
  const [status, setStatus] = useState<AutosaveStatus>('saved');
  const lastSavedContentRef = useRef(content);
  const lastSavedTitleRef = useRef(title ?? '');
  const debounceTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isSavingRef = useRef(false);

  const save = useCallback(async () => {
    if (!enabled || isSavingRef.current) return;

    const contentChanged = content !== lastSavedContentRef.current;
    const titleChanged = title !== undefined && title !== lastSavedTitleRef.current;

    if (!contentChanged && !titleChanged) {
      setStatus('saved');
      return;
    }

    isSavingRef.current = true;
    setStatus('saving');

    try {
      const payload: { content?: string; title?: string } = {};
      if (contentChanged) payload.content = content;
      if (titleChanged && title !== undefined) payload.title = title;

      await documentsService.updateDocument(documentId, payload);
      lastSavedContentRef.current = content;
      if (title !== undefined) lastSavedTitleRef.current = title;
      setStatus('saved');
    } catch {
      setStatus('error');
    } finally {
      isSavingRef.current = false;
    }
  }, [content, documentId, enabled, title]);

  const markDirty = useCallback(() => {
    if (content !== lastSavedContentRef.current || (title !== undefined && title !== lastSavedTitleRef.current)) {
      setStatus('unsaved');
    }
  }, [content, title]);

  useEffect(() => {
    if (!enabled) return;

    markDirty();

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      void save();
    }, 3000);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, [content, title, enabled, save, markDirty]);

  useEffect(() => {
    lastSavedContentRef.current = content;
    if (title !== undefined) lastSavedTitleRef.current = title;
    setStatus('saved');
  }, [documentId]);

  return { status, save, markDirty };
};
