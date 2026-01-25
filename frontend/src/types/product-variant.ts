/* =========
 * Weight variant (JSON field)
 * ========= */
export type WeightVariant = {
  weight: string;   // "50g", "100g"
  price: number;    // VND
  stock: number;
};

/* =========
 * Base type (khớp DB: product_variants)
 * ========= */
export type ProductVariantEntity = {
  id: number;
  productId: number;

  flavor: string;
  flavorCode: string;

  weightVariants: WeightVariant[];

  status: "in_stock" | "out_of_stock" | "coming_soon";

  images: string[];

  createdAt?: string;
  updatedAt?: string;
};
