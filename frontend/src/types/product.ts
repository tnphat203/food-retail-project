import type { ProductVariantEntity } from "./product-variant";
export type ProductEntity = {
  id: number;
  name: string;
  slug: string;

  shortDescription?: string | null;
  brand?: string | null;
  tags?: string[] | null;

  status: "active" | "inactive";
  ratingAverage: number;
  ratingCount: number;

  categoryId: number;

  createdAt?: string;
  updatedAt?: string;
};
export type Product = ProductEntity & {
  variants: ProductVariantEntity[];
};
