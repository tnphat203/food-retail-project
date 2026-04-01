import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import type {
  CreateProductPayload,
  UpdateProductPayload,
} from "@services/product.api";
import AdminModal from "@components/admin/AdminModal";
import AdminToast from "@components/ui/AdminToast";
import type { EditProductForm } from "./hook/productEditValidator";
import { updateProductApi, createProductApi } from "@services/product.api";
import { useProductEditForm } from "./hook/useProductEditForm";
import { STATUS_LABEL_MAP } from "@/utils/productLabels";

type CategoryOption = {
  value: number;
  label: string;
};

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onUpdated?: (updated: Product) => void;
  categoryOptions?: CategoryOption[];
};

export default function ProductEditModal({
  open,
  product,
  onClose,
  onUpdated,
  categoryOptions = [],
}: Props) {
  const [form, setForm] = useState<EditProductForm>({
    name: "",
    status: "active",
    brand: "",
    shortDescription: "",
    tags: [],
    categoryId: categoryOptions[0]?.value,
    slug: "",
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    open: boolean;
    message: string;
    type: "success" | "error";
  }>({
    open: false,
    message: "",
    type: "success",
  });

  const { getFieldError, markTouched } = useProductEditForm(form);

  useEffect(() => {
    if (!open) return;

    if (product) {
      setForm({
        name: product.name,
        status: product.status,
        brand: product.brand ?? "",
        shortDescription: product.shortDescription ?? "",
        tags: product.tags ?? [],
        categoryId: product.categoryId ?? categoryOptions[0]?.value,
        slug: product.slug ?? "",
      });
    } else {
      setForm({
        name: "",
        status: "active",
        brand: "",
        shortDescription: "",
        tags: [],
        categoryId: categoryOptions[0]?.value,
        slug: "",
      });
    }
  }, [product, categoryOptions]);

  const update = <K extends keyof EditProductForm>(
    key: K,
    value: EditProductForm[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (name: string) =>
    name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-")
      .replace(/[^\w-]+/g, "");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const slug = generateSlug(form.name);
      let result: Product;

      if (product) {
        const payload: UpdateProductPayload = {
          name: form.name,
          status: form.status,
          brand: form.brand,
          shortDescription: form.shortDescription,
          tags: form.tags,
          categoryId: form.categoryId,
          slug,
        };
        const res = await updateProductApi(product.id, payload);
        result = res.product;
        setToast({
          open: true,
          message: "Cập nhật sản phẩm thành công!",
          type: "success",
        });
      } else {
        const payload: CreateProductPayload = {
          name: form.name,
          slug,
          brand: form.brand,
          shortDescription: form.shortDescription,
          tags: form.tags,
          categoryId: form.categoryId!,
        };
        const res = await createProductApi(payload);
        result = res.product;
        setToast({
          open: true,
          message: "Tạo sản phẩm thành công!",
          type: "success",
        });
      }

      onUpdated?.(result);
      onClose();
    } catch (err) {
      console.error(err);
      setToast({ open: true, message: "Thao tác thất bại!", type: "error" });
    } finally {
      setLoading(false);
      setTimeout(() => setToast((prev) => ({ ...prev, open: false })), 2500);
    }
  };

  if (!open) return null;

  return (
    <>
      <AdminModal
        open={open}
        title={product ? "Chỉnh sửa sản phẩm" : "Tạo sản phẩm mới"}
        onClose={onClose}
        footer={
          <div className="flex justify-end gap-2 border-t pt-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
            >
              Huỷ
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Đang lưu..."
                : product
                  ? "Lưu thay đổi"
                  : "Tạo sản phẩm"}
            </button>
          </div>
        }
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-sm font-medium">Tên sản phẩm</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => markTouched("name")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {getFieldError("name") && (
              <p className="text-xs text-red-500">{getFieldError("name")}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="text-sm font-medium">Trạng thái</label>
            <select
              value={form.status}
              onChange={(e) =>
                update("status", e.target.value as EditProductForm["status"])
              }
              onBlur={() => markTouched("status")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            >
              {Object.entries(STATUS_LABEL_MAP).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
            {getFieldError("status") && (
              <p className="text-xs text-red-500">{getFieldError("status")}</p>
            )}
          </div>

          {categoryOptions.length > 0 && (
            <div className="space-y-1">
              <label className="text-sm font-medium">Nhóm sản phẩm</label>
              <select
                value={form.categoryId}
                onChange={(e) => update("categoryId", Number(e.target.value))}
                onBlur={() => markTouched("categoryId")}
                className="w-full px-3 py-2 border rounded-lg text-sm"
              >
                {categoryOptions.map((c) => (
                  <option key={c.value} value={c.value}>
                    {c.label}
                  </option>
                ))}
              </select>
              {getFieldError("categoryId") && (
                <p className="text-xs text-red-500">
                  {getFieldError("categoryId")}
                </p>
              )}
            </div>
          )}

          <div className="space-y-1">
            <label className="text-sm font-medium">Thương hiệu</label>
            <input
              type="text"
              value={form.brand ?? ""}
              onChange={(e) => update("brand", e.target.value)}
              onBlur={() => markTouched("brand")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
            {getFieldError("brand") && (
              <p className="text-xs text-red-500">{getFieldError("brand")}</p>
            )}
          </div>

          <div className="space-y-1 col-span-2">
            <label className="text-sm font-medium">Mô tả ngắn</label>
            <textarea
              value={form.shortDescription ?? ""}
              onChange={(e) => update("shortDescription", e.target.value)}
              onBlur={() => markTouched("shortDescription")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
              rows={3}
            />
            {getFieldError("shortDescription") && (
              <p className="text-xs text-red-500">
                {getFieldError("shortDescription")}
              </p>
            )}
          </div>

          <div className="space-y-1 col-span-2">
            <label className="text-sm font-medium">
              Tags (phân tách bằng dấu ,)
            </label>
            <input
              type="text"
              value={form.tags?.join(", ") ?? ""}
              onChange={(e) =>
                update(
                  "tags",
                  e.target.value.split(",").map((t) => t.trim()),
                )
              }
              onBlur={() => markTouched("tags")}
              className="w-full px-3 py-2 border rounded-lg text-sm"
            />
          </div>
        </div>
      </AdminModal>

      <AdminToast open={toast.open} message={toast.message} type={toast.type} />
    </>
  );
}
