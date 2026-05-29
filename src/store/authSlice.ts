import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'ADMIN' | 'EDITOR' | 'VIEWER';
  plan: 'FREE' | 'PRO' | 'TEAM';
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
}

const getInitialState = (): AuthState => {
  const defaultState: AuthState = {
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
  };

  // Prevent SSR crashes by checking execution environment
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
        refreshToken: parsed.refreshToken || null,
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
      action: PayloadAction<{ user: User | null; token: string | null; refreshToken: string | null }>
    ) => {
      const { user, token, refreshToken } = action.payload;
      state.user = user;
      state.token = token;
      state.refreshToken = refreshToken;
      state.isAuthenticated = !!token;

      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'writeflow_auth',
          JSON.stringify({ user, token, refreshToken })
        );
      }
    },
    logOut: (state) => {
      state.user = null;
      state.token = null;
      state.refreshToken = null;
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
