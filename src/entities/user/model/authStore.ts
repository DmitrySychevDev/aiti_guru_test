import { create } from 'zustand';
import { tokenStorage } from '@/shared/lib/storage';
import type { AuthState } from './types';

export const useAuthStore = create<AuthState>((set, get) => ({
  token: tokenStorage.get(),

  setToken: (token: string, remember: boolean) => {
    tokenStorage.set(token, remember);
    set({ token });
  },

  logout: () => {
    tokenStorage.clear();
    set({ token: null });
  },

  isAuthenticated: () => get().token !== null,
}));
