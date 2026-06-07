'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { X, Loader2, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useTemplates } from '@/features/templates/hooks/useTemplates';
import { useCreateDocument } from '@/features/documents/hooks/useDocuments';

type NewDocumentModalProps = {
  open: boolean;
  onClose: () => void;
};

export function NewDocumentModal({ open, onClose }: NewDocumentModalProps) {
  const router = useRouter();
  const [title, setTitle] = useState('Untitled Document');
  const [templateId, setTemplateId] = useState('');

  const { data: templatesData, isLoading: templatesLoading } = useTemplates({
    page: 1,
    limit: 20,
    sort: 'popular',
  });

  const createMutation = useCreateDocument();

  if (!open) return null;

  const templates = templatesData?.data?.items ?? [];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await createMutation.mutateAsync({
        title: title.trim() || 'Untitled Document',
        content: '<p></p>',
        ...(templateId && { templateId }),
      });
      onClose();
      router.push(`/documents/${response.data.id}/edit`);
    } catch {
      // errors handled by mutation state
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-lg border border-border bg-card p-6 shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">New document</h2>
          <Button variant="ghost" size="sm" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="doc-title">Title</Label>
            <Input
              id="doc-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Document title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="doc-template">Template (optional)</Label>
            {templatesLoading ? (
              <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Loading templates...
              </div>
            ) : (
              <select
                id="doc-template"
                value={templateId}
                onChange={(e) => setTemplateId(e.target.value)}
                className="w-full h-10 rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                <option value="">Blank document</option>
                {templates.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.title}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={createMutation.isPending}>
              {createMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Plus className="mr-2 h-4 w-4" />
              )}
              Create & edit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
