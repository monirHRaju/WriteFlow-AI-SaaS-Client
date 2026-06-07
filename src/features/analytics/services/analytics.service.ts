import axiosInstance from '@/lib/axios';
import { ApiResponse } from '@/features/auth/types/auth.types';
import { AiLog, UpdateProfileInput, UserStats } from '@/features/documents/types/document.types';
import { User } from '@/store/authSlice';

export const usersService = {
  getMyStats: async (): Promise<ApiResponse<UserStats>> => {
    const response = await axiosInstance.get<ApiResponse<UserStats>>('/users/me/stats');
    return response.data;
  },

  updateProfile: async (data: UpdateProfileInput): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.patch<ApiResponse<User>>('/users/me', data);
    return response.data;
  },
};

export const analyticsService = {
  getAiLogs: async (limit = 10): Promise<ApiResponse<AiLog[]>> => {
    const response = await axiosInstance.get<ApiResponse<AiLog[]>>('/ai/logs', {
      params: { page: 1, limit },
    });
    return response.data;
  },
};
