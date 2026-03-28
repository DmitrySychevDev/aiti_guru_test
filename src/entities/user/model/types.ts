export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  id: number;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  accessToken: string;
  refreshToken: string;
}

export interface AuthState {
  token: string | null;
  setToken: (token: string, remember: boolean) => void;
  logout: () => void;
  isAuthenticated: () => boolean;
}
