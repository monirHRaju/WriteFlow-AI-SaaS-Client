import axiosInstance from '@/lib/axios';
import {
  CreateDocumentInput,
  Document,
  DocumentApiResponse,
  DocumentsListResponse,
  GetDocumentsParams,
  UpdateDocumentInput,
} from '@/features/documents/types/document.types';

export const documentsService = {
  getDocuments: async (params: GetDocumentsParams = {}): Promise<DocumentsListResponse> => {
    const response = await axiosInstance.get<DocumentsListResponse>('/documents', { params });
    return response.data;
  },

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

  archiveDocument: async (id: string): Promise<DocumentApiResponse> => {
    const response = await axiosInstance.delete<DocumentApiResponse>(`/documents/${id}`);
    return response.data;
  },
};

export type { Document };
