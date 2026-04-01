import { useState, useEffect, useCallback } from "react";
import type { ProductVariant } from "@/types/product-variant";
import {
  getVariantsByProductApi,
  createVariantApiWithoutImages,
  updateVariantApi,
} from "@/services/product-variant.api";

export function useProductVariants(productId: number | null) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchVariants = useCallback(async () => {
    if (!productId) return;
    try {
      setLoading(true);
      const data = await getVariantsByProductApi(productId);
      // đảm bảo images luôn có array
      setVariants(data.map(v => ({ ...v, images: v.images ?? [] })));
    } catch (err) {
      console.error("Tải biến thể thất bại", err);
    } finally {
      setLoading(false);
    }
  }, [productId]);

  const addVariant = async (
    payload: Parameters<typeof createVariantApiWithoutImages>[1]
  ): Promise<ProductVariant | null> => {
    if (!productId) return null;
    try {
      const response = await createVariantApiWithoutImages(productId, payload);
      setVariants(prev => [...prev, response.variant]); // chỉ push variant
      return response.variant;
    } catch (err) {
      console.error("Thêm biến thể thất bại", err);
      return null;
    }
  };

  const editVariant = async (
    variantId: number,
    payload: Parameters<typeof updateVariantApi>[2]
  ): Promise<ProductVariant | null> => {
    if (!productId) return null;
    try {
      const response = await updateVariantApi(productId, variantId, payload);
      setVariants(prev =>
        prev.map(v => (v.id === variantId ? response.variant : v))
      );
      return response.variant;
    } catch (err) {
      console.error("Cập nhật biến thể thất bại", err);
      return null;
    }
  };

  useEffect(() => {
    fetchVariants();
  }, [fetchVariants]);

  return { variants, loading, fetchVariants, addVariant, editVariant };
}