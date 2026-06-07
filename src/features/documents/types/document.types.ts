import { ApiResponse } from '@/features/auth/types/auth.types';

export type DocumentStatus = 'DRAFT' | 'PUBLISHED' | 'ARCHIVED';

export type Document = {
  id: string;
  title: string;
  content: string;
  status: DocumentStatus;
  userId: string;
  templateId: string | null;
  tokensUsed: number;
  createdAt: string;
  updatedAt: string;
};

export type CreateDocumentInput = {
  title: string;
  content?: string;
  templateId?: string;
};

export type UpdateDocumentInput = {
  title?: string;
  content?: string;
};

export type RewriteMode = 'shorten' | 'expand' | 'formal' | 'casual' | 'fix_grammar';

export type AiJobStatus = {
  jobId: string;
  status: string;
  progress: number;
  type: string;
  result: { rewrittenText?: string } | null;
};

export type DocumentApiResponse = ApiResponse<Document>;
