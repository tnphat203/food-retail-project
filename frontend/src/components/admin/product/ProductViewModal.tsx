import { useEffect, useState, type ReactNode } from "react";
import type { Product } from "@/types/product";
import type { ProductVariant } from "@/types/product-variant";
import type { ProductCategory } from "@/types/product-category";
import {
  getVariantsByProductApi,
  createVariantApiWithoutImages,
  type CreateVariantPayloadWithoutImages,
} from "@services/product-variant.api";
import { productStatusLabel } from "@/utils/productLabels";
import ProductVariantCard from "./ProductVariantCard";
import VariantDetailModal from "./VariantDetailModal";
import AddVariantModal from "./AddVariantModal";

interface Props {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onEdit: (p: Product) => void;
  categories?: ProductCategory[];
}

export default function ProductViewModal({
  open,
  product,
  onClose,
  onEdit,
  categories,
}: Props) {
  const [variants, setVariants] = useState<ProductVariant[]>([]);
  const [loadingVariants, setLoadingVariants] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState<ProductVariant | null>(
    null,
  );
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    if (!open || !product) return;

    const fetchVariants = async () => {
      try {
        setLoadingVariants(true);

        const data = await getVariantsByProductApi(product.id);

        setVariants(
          data.map((v) => ({
            ...v,
            images: v.images ?? [],
            weights: v.weights ?? [],
          })),
        );
      } catch (err) {
        console.error("Tải biến thể thất bại", err);
      } finally {
        setLoadingVariants(false);
      }
    };

    fetchVariants();
  }, [open, product]);

  // ✅ update variant sau khi edit weight
  const handleUpdateVariant = (updated: ProductVariant) => {
    setVariants((prev) => prev.map((v) => (v.id === updated.id ? updated : v)));
    setSelectedVariant(updated);
  };

  // ✅ create variant mới
  const handleCreateVariant = async (
    payload: CreateVariantPayloadWithoutImages,
  ) => {
    if (!product) return null;

    try {
      const res = await createVariantApiWithoutImages(product.id, payload);

      const newVariant: ProductVariant = {
        ...res.variant,
        images: res.variant.images ?? [],
        weights: res.variant.weights ?? [],
      };

      setVariants((prev) => [newVariant, ...prev]);

      return newVariant;
    } catch (err) {
      console.error("Tạo variant lỗi", err);
      return null;
    }
  };

  if (!open || !product) return null;

  const categoryLabel =
    product.category?.name ??
    categories?.find((c) => c.id === product.categoryId)?.name ??
    "-";

  const formatDateTime = (dateStr?: string) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleString("vi-VN");
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white w-[900px] max-h-[90vh] overflow-y-auto rounded-xl shadow-lg">
          <div className="sticky top-0 bg-white z-10 px-6 pt-6 pb-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Chi tiết sản phẩm</h2>

            <div className="flex gap-2">
              <button
                onClick={() => onEdit(product)}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Sửa sản phẩm
              </button>

              <button
                onClick={onClose}
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Đóng
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6">
            <div className="grid grid-cols-3 gap-6 text-sm">
              <Info label="ID" value={product.id} />
              <Info label="Tên" value={product.name} />
              <Info label="Thương hiệu" value={product.brand ?? "-"} />
              <Info label="Danh mục" value={categoryLabel} />
              <Info label="Slug" value={product.slug} />
              <Info
                label="Tags"
                value={product.tags?.length ? product.tags.join(", ") : "-"}
              />
              <Info
                label="Trạng thái"
                value={productStatusLabel(product.status)}
              />
              <Info label="Rating" value={product.ratingAverage} />
              <Info label="Số đánh giá" value={product.ratingCount} />
              <Info
                label="Ngày tạo"
                value={formatDateTime(product.createdAt)}
              />
              <Info
                label="Cập nhật"
                value={formatDateTime(product.updatedAt)}
              />

              <div className="col-span-3">
                <Info label="Mô tả" value={product.shortDescription ?? "-"} />
              </div>
            </div>

            <hr />

            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium">Biến thể</h3>

                <button
                  onClick={() => setOpenAddModal(true)}
                  className="px-3 py-1 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  + Thêm biến thể
                </button>
              </div>

              {loadingVariants ? (
                <div className="text-sm text-gray-500">
                  Đang tải biến thể...
                </div>
              ) : variants.length === 0 ? (
                <div className="text-sm text-gray-500">Chưa có biến thể</div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {variants.map((v) => (
                    <ProductVariantCard
                      key={v.id}
                      variant={v}
                      onClick={() => setSelectedVariant(v)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ✅ Modal chi tiết variant */}
      {selectedVariant && (
        <VariantDetailModal
          variant={selectedVariant}
          onClose={() => setSelectedVariant(null)}
          onUpdate={handleUpdateVariant}
        />
      )}

      {/* ✅ Modal thêm variant */}
      {openAddModal && (
        <AddVariantModal
          onClose={() => setOpenAddModal(false)}
          onSave={handleCreateVariant}
        />
      )}
    </>
  );
}

function Info({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div>
      <div className="text-gray-500 text-xs">{label}</div>
      <div className="font-medium">{value ?? "-"}</div>
    </div>
  );
}
