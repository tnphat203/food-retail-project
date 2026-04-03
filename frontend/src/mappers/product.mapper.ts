import type { ProductResponse, Product } from "../types/product";
import type { Paginated } from "@/types/common/pagination";
import type { ProductVariant } from "../types/product-variant";
import type { ProductUI, ProductVariantUI, WeightVariantUI } from "../types/product-ui";

function mapWeightUI(weight: ProductVariant["weights"][number]): WeightVariantUI {
  return {
    id: weight.id,
    weight: weight.weight,
    price: weight.price,
    discountPrice: weight.discountPrice ?? weight.price,
    discountType: weight.discountType ?? null,
    stock: weight.stock,
  };
}

function mapVariantUI(variant: ProductVariant): ProductVariantUI {
  return {
    id: variant.id,
    flavor: variant.flavor,
    flavorCode: variant.flavorCode ?? "",
    status: variant.status,
    weights: variant.weights.map(mapWeightUI),
    images: variant.images?.length
      ? variant.images
      : ["https://via.placeholder.com/150"],
  };
}

export function mapProductUI(product: Product | ProductResponse["product"]): ProductUI {
  const variantsUI = product.variants?.map(mapVariantUI) || [];

  const firstImage =
    variantsUI?.[0]?.images?.[0] || "https://via.placeholder.com/150";

  const allPrices = variantsUI.flatMap(v => v.weights.map(w => w.discountPrice ?? w.price));
  const minPrice = allPrices.length ? Math.min(...allPrices) : 0;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : 0;

  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    shortDescription: product.shortDescription ?? null,
    brand: product.brand ?? null,
    category: product.category?.name ?? "",
    categoryId: product.categoryId,
    tags: product.tags ?? [],
    image: firstImage,
    minPrice,
    maxPrice,
    status: product.status,
    ratingAverage: product.ratingAverage,
    ratingCount: product.ratingCount,
    variants: variantsUI,
    createdAt: product.createdAt,
    updatedAt: product.updatedAt,
  };
}

export function mapProductsUI(products: Product[]): ProductUI[] {
  return products.map(mapProductUI);
}

export function mapPaginatedProductsUI(response: Paginated<Product>): {
  data: ProductUI[];
  pagination: Paginated<Product>["pagination"];
} {
  return {
    data: mapProductsUI(response.data),
    pagination: response.pagination,
  };
}