export type AdminAnalytics = {
  totalUsers: number;
  totalDocuments: number;
  totalTokensUsed: number;
  totalTemplates: number;
  dailySignups: { date: string; count: number }[];
  aiUsageByAgent: {
    agentType: string;
    totalTokens: number;
    totalRequests: number;
  }[];
};

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: "ADMIN" | "EDITOR" | "VIEWER";
  plan: "FREE" | "PRO" | "TEAM";
  isActive: boolean;
  createdAt: string;
  _count?: {
    documents: number;
    aiLogs: number;
    templates: number;
  };
};

export type AdminReview = {
  id: string;
  rating: number;
  comment: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
  createdAt: string;
  user: { id: string; name: string; email: string };
  template: { id: string; title: string; category: string };
};

export type PaginatedResponse<T> = {
  success: boolean;
  message?: string;
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPage: number;
  };
  data: T[];
};

export type GetUsersParams = {
  page?: number;
  limit?: number;
  search?: string;
  role?: string;
};

export type UpdateRoleInput = { role: "ADMIN" | "EDITOR" | "VIEWER" };
export type UpdateStatusInput = { isActive: boolean };
export type UpdateReviewInput = { status: "APPROVED" | "REJECTED" };
