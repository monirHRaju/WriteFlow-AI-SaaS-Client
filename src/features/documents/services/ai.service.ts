import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/features/auth/types/auth.types';
import { AiJobStatus, RewriteMode } from '@/features/documents/types/document.types';

export const aiService = {
  rewrite: async (
    text: string,
    mode: RewriteMode
  ): Promise<ApiResponse<{ jobId: string }>> => {
    const response = await axiosInstance.post<ApiResponse<{ jobId: string }>>('/ai/rewrite', {
      text,
      mode,
    });
    return response.data;
  },

  getJobStatus: async (jobId: string): Promise<ApiResponse<AiJobStatus>> => {
    const response = await axiosInstance.get<ApiResponse<AiJobStatus>>(`/ai/status/${jobId}`);
    return response.data;
  },
};
