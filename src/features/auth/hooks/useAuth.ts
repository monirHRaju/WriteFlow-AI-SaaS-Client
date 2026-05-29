'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store';
import { setCredentials, logOut } from '@/store/authSlice';
import { authService } from '@/features/auth/services/auth.service';
import { LoginInput, RegisterInput } from '@/features/auth/types/auth.types';

export const useLogin = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, token: accessToken }));
      router.push('/dashboard');
    },
  });
};

export const useRegister = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (response) => {
      const { user, accessToken } = response.data;
      dispatch(setCredentials({ user, token: accessToken }));
      router.push('/dashboard');
    },
  });
};

export const useLogout = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      dispatch(logOut());
      router.push('/login');
    },
  });
};

export const useRefresh = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  return useMutation({
    mutationFn: () => authService.refresh(),
    onSuccess: (response) => {
      dispatch(
        setCredentials({
          token: response.data.accessToken,
          user,
        })
      );
    },
  });
};
