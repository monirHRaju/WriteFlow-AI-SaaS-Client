import axios from 'axios';
import { store } from '@/store';
import { setCredentials, logOut } from '@/store/authSlice';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach Access Token
axiosInstance.interceptors.request.use(
  (config) => {
    // Only attempt to read Redux store on client-side browser execution
    if (typeof window !== 'undefined') {
      const token = store.getState().auth.token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Manage 401 Token Refresh Flow
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Check if response is 401 and request has not been retried yet
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      typeof window !== 'undefined'
    ) {
      originalRequest._retry = true;

      try {
        const refreshToken = store.getState().auth.refreshToken;
        if (!refreshToken) {
          throw new Error('Refresh token not found');
        }

        // Call the refresh API route
        const refreshResponse = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5005/api/v1'}/auth/refresh-token`,
          { refreshToken }
        );

        // Standard dynamic data extraction
        const { accessToken, newRefreshToken } = refreshResponse.data.data;

        // Dispatch updated credentials to synchronize memory store
        store.dispatch(
          setCredentials({
            token: accessToken,
            refreshToken: newRefreshToken || refreshToken,
            user: store.getState().auth.user,
          })
        );

        // Overwrite the header and retry the request
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Reset auth slice on failed refresh attempt
        store.dispatch(logOut());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
