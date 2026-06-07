import axiosInstance from '@/lib/axios';
import {
  CreateDocumentInput,
  Document,
  DocumentApiResponse,
  UpdateDocumentInput,
} from '@/features/documents/types/document.types';
import { ApiResponse } from '@/features/auth/types/auth.types';

export const documentsService = {
  createDocument: async (data: CreateDocumentInput): Promise<DocumentApiResponse> => {
    const response = await axiosInstance.post<DocumentApiResponse>('/documents', data);
    return response.data;
  },

  getDocument: async (id: string): Promise<DocumentApiResponse> => {
    const response = await axiosInstance.get<DocumentApiResponse>(`/documents/${id}`);
    return response.data;
  },

  updateDocument: async (id: string, data: UpdateDocumentInput): Promise<DocumentApiResponse> => {
    const response = await axiosInstance.patch<DocumentApiResponse>(`/documents/${id}`, data);
    return response.data;
  },
};

export type { Document };
