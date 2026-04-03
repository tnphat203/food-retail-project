import axiosInstance from "./axios.instance";
import type { ProductVariant } from "../types/product-variant";

const BASE_URL = "/products";

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

export interface CreateVariantPayloadWithoutImages {
  flavor: string;
  flavorCode?: string;
  weights?: {
    weight: number;
    price: number;
    stock: number;
    discountType?: "percent" | "fixed" | null;
    discountPrice?: number;
    discountPercent?: number;
  }[];
}

// Lấy tất cả variant của 1 product
export const getVariantsByProductApi = async (
  productId: number
): Promise<ProductVariant[]> => {
  const { data } = await axiosInstance.get<ProductVariant[]>(
    `${BASE_URL}/${productId}/variants`
  );
  return data;
};

// Tạo variant (không có images)
export const createVariantApiWithoutImages = async (
  productId: number,
  payload: CreateVariantPayloadWithoutImages
): Promise<VariantResponse> => {
  const { data } = await axiosInstance.post<VariantResponse>(
    `${BASE_URL}/${productId}/variants`,
    {
      flavor: payload.flavor,
      flavorCode: payload.flavorCode,
      weightVariants: payload.weights,
    }
  );
  return data;
};

// Cập nhật variant
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

// Xóa variant
export const deleteVariantApi = async (
  productId: number,
  variantId: number
): Promise<{ message: string }> => {
  const { data } = await axiosInstance.delete<{ message: string }>(
    `${BASE_URL}/${productId}/variants/${variantId}`
  );
  return data;
};