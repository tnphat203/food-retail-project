import type { ProductVariantWeight } from "./product-variant-weight";

export type ProductVariant = {
  id: number;
  productId: number;
  flavor: string;
  flavorCode?: string;
  status: "in_stock" | "out_of_stock" | "coming_soon";
  images?: string[];
  weights: ProductVariantWeight[];
  createdAt?: string;
  updatedAt?: string;
};