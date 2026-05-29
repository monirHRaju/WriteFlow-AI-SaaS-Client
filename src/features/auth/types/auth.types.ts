export type UserRole = 'ADMIN' | 'EDITOR' | 'VIEWER';
export type UserPlan = 'FREE' | 'PRO' | 'TEAM';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string | null;
  plan: UserPlan;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

export type AuthResponse = {
  user: User;
  accessToken: string;
};

export type RefreshResponse = {
  accessToken: string;
};

export type ApiResponse<T> = {
  success: boolean;
  message?: string;
  data: T;
};

export type ApiErrorSource = {
  path: string;
  message: string;
};

export type ApiErrorResponse = {
  success: false;
  message?: string;
  errors?: ApiErrorSource[];
};

export type LoginInput = {
  email: string;
  password: string;
};

export type RegisterInput = {
  name: string;
  email: string;
  password: string;
};
