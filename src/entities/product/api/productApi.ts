import { apiClient } from '@/shared/api/axios';
import type { Product, ProductsResponse, ProductsQueryParams } from '../model/types';

interface AddProductInput {
  title: string;
  price: number;
  brand: string;
  sku: string;
}

export const productApi = {
  getProducts: async (params: ProductsQueryParams): Promise<ProductsResponse> => {
    const { page, limit, sortBy, order, search } = params;
    const skip = (page - 1) * limit;

    if (search) {
      const response = await apiClient.get<ProductsResponse>('/products/search', {
        params: { q: search, limit, skip, sortBy, order },
      });
      return response.data;
    }

    const response = await apiClient.get<ProductsResponse>('/products', {
      params: { limit, skip, sortBy, order },
    });
    return response.data;
  },

  addProduct: async (data: AddProductInput): Promise<Product> => {
    const response = await apiClient.post<Product>('/products/add', data);
    return response.data;
  },
};
