import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  plan: 'FREE' | 'PRO' | 'TEAM';
  avatar?: string | null;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const defaultState: AuthState = {
    user: null,
    token: null,
    isAuthenticated: false,
  };

  if (typeof window === 'undefined') {
    return defaultState;
  }

  try {
    const storedAuth = localStorage.getItem('writeflow_auth');
    if (storedAuth) {
      const parsed = JSON.parse(storedAuth);
      return {
        user: parsed.user || null,
        token: parsed.token || null,
        isAuthenticated: !!parsed.token,
      };
    }
  } catch (err) {
    console.error('Failed to parse localStorage session state:', err);
  }

  return defaultState;
};

const authSlice = createSlice({
  name: 'auth',
  initialState: getInitialState(),
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{ user: User | null; token: string | null }>
    ) => {
      const { user, token } = action.payload;
      state.user = user;
      state.token = token;
      state.isAuthenticated = !!token;

      if (typeof window !== 'undefined') {
        localStorage.setItem('writeflow_auth', JSON.stringify({ user, token }));
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;

      if (typeof window !== 'undefined') {
        localStorage.removeItem('writeflow_auth');
      }
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;
export default authSlice.reducer;
export type { AuthState };
