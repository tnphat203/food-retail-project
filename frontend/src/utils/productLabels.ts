import type { Product } from "@/types/product"
import type { ProductVariant } from "@/types/product-variant"
import type { ProductCategory } from "@/types/product-category";

export const STATUS_LABEL_MAP: Record<NonNullable<Product["status"]>, string> = {
  active: "Đang hoạt động",
  inactive: "Ngưng hoạt động",
};

export const productStatusLabel = (status?: Product["status"]) => {
  if (!status) return "-";
  return STATUS_LABEL_MAP[status];
};

export const STATUS_VARIANT_MAP: Record<NonNullable<Product["status"]>, string> = {
  active: "bg-green-50 text-green-700 border-green-200",
  inactive: "bg-gray-50 text-gray-700 border-gray-200",
};

export const STATUS_FILTER_OPTIONS = [
  { label: "Tất cả", value: "all" },
  ...Object.entries(STATUS_LABEL_MAP).map(([value, label]) => ({
    label,
    value,
  })),
] as const;

export const CATEGORY_FILTER_OPTIONS = (categories?: ProductCategory[]) => [
  { label: "Tất cả", value: "all" },
  ...(categories?.map((c) => ({ label: c.name, value: c.id.toString() })) ?? []),
];

export const LIMIT_OPTIONS = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
] as const;

export const STATUS_VARIANT_LABEL: Record<
  NonNullable<ProductVariant["status"]>,
  { label: string; className: string }
> = {
  in_stock: { label: "Còn hàng", className: "bg-green-50 text-green-700 border-green-200" },
  out_of_stock: { label: "Hết hàng", className: "bg-red-50 text-red-700 border-red-200" },
  coming_soon: { label: "Sắp có", className: "bg-yellow-50 text-yellow-700 border-yellow-200" },
};