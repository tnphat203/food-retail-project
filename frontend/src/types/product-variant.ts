export type WeightVariant = {
  weight: string;
  price: number;
  stock: number;
};

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
