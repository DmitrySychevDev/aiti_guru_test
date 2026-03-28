import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProviders } from './providers';
import { RequireAuth, RedirectIfAuth } from './router';
import { LoginPage } from '@/pages/login';
import { ProductsPage } from '@/pages/products';

export function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Routes>
          <Route element={<RedirectIfAuth />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>

          <Route element={<RequireAuth />}>
            <Route path="/products" element={<ProductsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/products" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProviders>
  );
}
