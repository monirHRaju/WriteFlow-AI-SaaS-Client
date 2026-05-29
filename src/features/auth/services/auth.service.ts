import axiosInstance from '@/lib/axios';
import {
  ApiResponse,
  AuthResponse,
  LoginInput,
  RefreshResponse,
  RegisterInput,
  User,
} from '@/features/auth/types/auth.types';

export const authService = {
  register: async (data: RegisterInput): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/register', data);
    return response.data;
  },

  login: async (data: LoginInput): Promise<ApiResponse<AuthResponse>> => {
    const response = await axiosInstance.post<ApiResponse<AuthResponse>>('/auth/login', data);
    return response.data;
  },

  logout: async (): Promise<ApiResponse<null>> => {
    const response = await axiosInstance.post<ApiResponse<null>>('/auth/logout');
    return response.data;
  },

  refresh: async (): Promise<ApiResponse<RefreshResponse>> => {
    const response = await axiosInstance.post<ApiResponse<RefreshResponse>>('/auth/refresh');
    return response.data;
  },

  getMe: async (): Promise<ApiResponse<User>> => {
    const response = await axiosInstance.get<ApiResponse<User>>('/auth/me');
    return response.data;
  },
};
