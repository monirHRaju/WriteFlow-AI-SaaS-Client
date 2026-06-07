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
  status?: DocumentStatus;
};

export type GetDocumentsParams = {
  search?: string;
  status?: DocumentStatus;
  page?: number;
  limit?: number;
};

export type PaginatedDocuments = {
  items: Document[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
};

export type DocumentsListResponse = ApiResponse<PaginatedDocuments>;

export type RewriteMode = 'shorten' | 'expand' | 'formal' | 'casual' | 'fix_grammar';

export type AiJobStatus = {
  jobId: string;
  status: string;
  progress: number;
  type: string;
  result: { rewrittenText?: string } | null;
};

export type DocumentApiResponse = ApiResponse<Document>;

export type UserStats = {
  totalDocuments: number;
  totalTokens: number;
  plan: 'FREE' | 'PRO' | 'TEAM';
  planTokenLimit: number;
  planUsagePercent: number;
};

export type AiLog = {
  id: string;
  userId: string;
  agentType: 'DRAFT' | 'REWRITE' | 'CHAT' | 'REVIEW_SUMMARY';
  prompt: string;
  response: string;
  tokensUsed: number;
  createdAt: string;
};

export type UpdateProfileInput = {
  name?: string;
  avatar?: string;
};
