import type { Product } from "@/types/product";

export type StatusValue = NonNullable<Product["status"]>;

export type EditProductForm = {
  name: string;
  slug?: string;
  status: StatusValue;
  brand?: string;
  shortDescription?: string;
  tags?: string[];
  categoryId?: number;
};

export type ProductFormErrors = Partial<Record<keyof EditProductForm, string>>;

const MAX_NAME_LENGTH = 100;
const MAX_BRAND_LENGTH = 50;
const MAX_SHORT_DESC_LENGTH = 255;
const MAX_TAG_LENGTH = 30;
export const ALLOWED_STATUS: StatusValue[] = ["active", "inactive"];

export function validateProductForm(form: EditProductForm | null): ProductFormErrors {
  if (!form) return {};

  const errors: ProductFormErrors = {};

  const name = form.name.trim();
  if (!name) errors.name = "Vui lòng nhập tên sản phẩm";
  else if (name.length > MAX_NAME_LENGTH)
    errors.name = `Tên sản phẩm tối đa ${MAX_NAME_LENGTH} ký tự`;

  if (!ALLOWED_STATUS.includes(form.status))
    errors.status = "Trạng thái không hợp lệ";

  const brand = form.brand?.trim();
  if (brand && brand.length > MAX_BRAND_LENGTH)
    errors.brand = `Tên thương hiệu tối đa ${MAX_BRAND_LENGTH} ký tự`;

  const shortDesc = form.shortDescription?.trim();
  if (shortDesc && shortDesc.length > MAX_SHORT_DESC_LENGTH)
    errors.shortDescription = `Mô tả tối đa ${MAX_SHORT_DESC_LENGTH} ký tự`;

  if (form.categoryId == null)
    errors.categoryId = "Vui lòng chọn nhóm sản phẩm";

  if (form.tags && form.tags.length > 0) {
    const tagArray = form.tags
      .flatMap((tag) => tag.split(",").map((t) => t.trim()))
      .filter(Boolean);
    const invalidTag = tagArray.find((tag) => tag.length > MAX_TAG_LENGTH);
    if (invalidTag) errors.tags = `Mỗi tag tối đa ${MAX_TAG_LENGTH} ký tự`;
  }

  return errors;
}