import type { ProductVariant } from "./product-variant";
import type { ProductCategory } from "./product-category";
import type { Paginated } from "./common/pagination";

export type Product = {
  id: number;
  name: string;
  slug: string;
  shortDescription: string | null;
  brand: string | null;
  tags: string[];
  status: "active" | "inactive";
  ratingAverage: number;
  ratingCount: number;
  categoryId: number;
  category?: ProductCategory;
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
};


export type ProductsPaginatedResponse = Paginated<Product>;

export interface ProductResponse {
  message: string;
  product: Product;
}