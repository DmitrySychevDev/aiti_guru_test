import { Navigate, Outlet } from 'react-router-dom';
import { useAuthStore } from '@/entities/user';

export function RequireAuth() {
  const token = useAuthStore((state) => state.token);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}

export function RedirectIfAuth() {
  const token = useAuthStore((state) => state.token);

  if (token) {
    return <Navigate to="/products" replace />;
  }

  return <Outlet />;
}
