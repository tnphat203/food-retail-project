import axiosInstance from "./axios.instance";

import type {
  Product,
  ProductsPaginatedResponse,
  ProductResponse,
} from "../types/product";

import type { ProductVariant } from "../types/product-variant";

const BASE_URL = "/products";

export interface GetAllProductsParams {
  page?: number;
  limit?: number;
  search?: string;
  categoryId?: number;
  status?: Product["status"];
}

export const getAllProductsApi = async (
  params?: GetAllProductsParams
): Promise<ProductsPaginatedResponse> => {
  const { data } = await axiosInstance.get<ProductsPaginatedResponse>(BASE_URL, { params });
  return data;
};

export const getProductByIdApi = async (id: number): Promise<Product> => {
  const { data } = await axiosInstance.get<Product>(`${BASE_URL}/${id}`);
  return data;
};


export const createProductApi = async (
  payload: CreateProductPayload
): Promise<ProductResponse> => {
  const { data } = await axiosInstance.post<ProductResponse>(
    BASE_URL,
    payload
  );
  return data;
};
export interface CreateProductPayload {
  name: string;
  slug: string;
  shortDescription?: string | undefined;
  brand?: string | undefined;
  tags?: string[] | undefined;
  categoryId: number;
}

export type UpdateProductPayload = Partial<{
  name: string;
  slug: string;
  shortDescription?: string | undefined;
  brand?: string | undefined;
  tags?: string[] | undefined;
  categoryId: number | undefined;
}> & {
  status?: Product["status"];
};

export const updateProductApi = async (
  id: number,
  payload: UpdateProductPayload
): Promise<ProductResponse> => {
  const { data } = await axiosInstance.put<ProductResponse>(`${BASE_URL}/${id}`, payload);
  return data;
};

export const deleteProductApi = async (
  id: number
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(`${BASE_URL}/${id}`);
  return data;
};

export interface UpdateVariantPayload {
  flavor?: string;
  flavorCode?: string;
  images?: string[];
  status?: ProductVariant["status"];
  weights?: {
    id?: number;
    weight?: number;
    price?: number;
    stock?: number;
    discountType?: "percent" | "fixed" | null;
    discountPrice?: number;
    discountPercent?: number;
  }[];
}

export interface VariantResponse {
  message: string;
  variant: ProductVariant;
}

export const updateVariantApi = async (
  productId: number,
  variantId: number,
  payload: UpdateVariantPayload
): Promise<VariantResponse> => {
  const { data } = await axiosInstance.put<VariantResponse>(
    `${BASE_URL}/${productId}/variants/${variantId}`,
    payload
  );
  return data;
};

export const getVariantsByProductApi = async (
  productId: number
): Promise<ProductVariant[]> => {
  const { data } = await axiosInstance.get<ProductVariant[]>(`${BASE_URL}/${productId}/variants`);
  return data;
};

export const deleteVariantApi = async (
  productId: number,
  variantId: number
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_URL}/${productId}/variants/${variantId}`
  );
  return data;
};

export const getTopRatedProductsApi = async (): Promise<Product[]> => {
  const { data } = await axiosInstance.get<ProductsPaginatedResponse>(`${BASE_URL}/top-rated`);
  return data.data;
};

export const patchProductApi = async (
  id: number,
  payload: Partial<{
    name: string;
    slug: string;
    shortDescription?: string;
    brand?: string;
    tags?: string[];
    categoryId: number;
    status?: Product["status"];
  }>
): Promise<ProductResponse> => {
  const { data } = await axiosInstance.patch<ProductResponse>(`${BASE_URL}/${id}`, payload);
  return data;
};
