import { AUTH_TOKEN_KEY } from '@/shared/config/constants';

export const tokenStorage = {
  get(): string | null {
    return localStorage.getItem(AUTH_TOKEN_KEY) ?? sessionStorage.getItem(AUTH_TOKEN_KEY);
  },

  set(token: string, remember: boolean): void {
    if (remember) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    } else {
      sessionStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  },

  clear(): void {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    sessionStorage.removeItem(AUTH_TOKEN_KEY);
  },
};
