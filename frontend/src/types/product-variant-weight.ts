export type ProductVariantWeight = {
  id: number;
  variantId: number;
  weight: number;
  price: number;
  discountPrice: number;
  discountType: "percent" | "fixed" | null;
  discountPercent: number;
  stock: number;
  createdAt: string;
  updatedAt: string;
};