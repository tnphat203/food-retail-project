import type { ProductVariantEntity } from "./product-variant";
/* =========
 * Base type (khớp DB: products)
 * ========= */
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

/* =========
 * UI / API aggregate type
 * ========= */
export type Product = ProductEntity & {
  variants: ProductVariantEntity[];
};
