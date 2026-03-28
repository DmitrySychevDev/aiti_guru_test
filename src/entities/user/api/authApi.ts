import { apiClient } from '@/shared/api/axios';
import type { LoginRequest, LoginResponse } from '../model/types';

export const authApi = {
  login: async (data: LoginRequest): Promise<LoginResponse> => {
    const response = await apiClient.post<LoginResponse>('/auth/login', data);
    return response.data;
  },
};
