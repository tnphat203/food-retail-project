export type WeightVariantUI = {
  id: number;
  weight: number;
  price: number;
  discountPrice?: number | null;
  discountType?: "percent" | "fixed" | null;
  stock: number;
  image?: string;
};

export type ProductVariantUI = {
  id: number;
  flavor: string;
  flavorCode?: string;
  status: "in_stock" | "out_of_stock" | "coming_soon";
  weights: WeightVariantUI[];
  images: string[];
};

export type ProductUI = {
  id: number;
  name: string;
  slug: string;
  shortDescription?: string | null;
  brand?: string | null;
  category?: string;
  categoryId?: number;
  tags?: string[];
  image: string;
  minPrice: number;
  maxPrice: number;
  status: "active" | "inactive";
  ratingAverage: number;
  ratingCount: number;
  variants: ProductVariantUI[];
  createdAt?: string;
  updatedAt?: string;
};