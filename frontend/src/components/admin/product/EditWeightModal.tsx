import { useState } from "react";
import type { ProductVariantWeight } from "@/types/product-variant-weight";

interface Props {
  weight: ProductVariantWeight;
  onSave: (updated: ProductVariantWeight) => void;
  onClose: () => void;
}

export default function EditWeightModal({ weight, onSave, onClose }: Props) {
  const [localWeight, setLocalWeight] = useState<ProductVariantWeight>(weight);

  const handleChange = (
    field: keyof ProductVariantWeight,
    value: number | null,
  ) => {
    if (field === "discountPercent") {
      const percent = Math.min(Math.max(Number(value), 0), 100);
      const price = localWeight.price ?? 0;

      setLocalWeight((prev) => ({
        ...prev,
        discountPercent: percent,
        discountPrice: Math.round(price * (1 - percent / 100)),
      }));
      return;
    }

    setLocalWeight((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const formatPrice = (value?: number) => (value ?? 0).toLocaleString("vi-VN");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[420px] rounded-2xl shadow-xl p-6">
        <h3 className="text-lg font-semibold mb-5 text-center">
          Chỉnh sửa {weight.weight}g
        </h3>

        <div className="flex flex-col gap-4">
          {/* Weight */}
          <div>
            <label className="text-sm text-gray-600">Trọng lượng (g)</label>
            <input
              type="number"
              value={localWeight.weight ?? 0}
              onChange={(e) => handleChange("weight", Number(e.target.value))}
              className="mt-1 w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Price */}
          <div>
            <label className="text-sm text-gray-600">Giá gốc (₫)</label>
            <input
              type="number"
              value={localWeight.price ?? 0}
              onChange={(e) => handleChange("price", Number(e.target.value))}
              className="mt-1 w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="text-xs text-gray-400 mt-1">
              {formatPrice(localWeight.price)} ₫
            </div>
          </div>

          {/* Discount block */}
          <div className="border rounded-lg p-3 bg-gray-50">
            <div className="text-sm font-medium mb-2 text-gray-700">
              Giảm giá
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">% giảm</label>
                <input
                  type="number"
                  value={localWeight.discountPercent ?? 0}
                  onChange={(e) =>
                    handleChange("discountPercent", Number(e.target.value))
                  }
                  className="mt-1 w-full border px-2 py-1 rounded-md"
                />
              </div>

              <div>
                <label className="text-xs text-gray-500">Giá sau giảm</label>
                <input
                  type="number"
                  value={localWeight.discountPrice ?? localWeight.price ?? 0}
                  onChange={(e) =>
                    handleChange("discountPrice", Number(e.target.value))
                  }
                  className="mt-1 w-full border px-2 py-1 rounded-md"
                />
              </div>
            </div>

            <div className="text-xs text-gray-400 mt-2">
              = {formatPrice(localWeight.discountPrice)} ₫
            </div>
          </div>

          {/* Stock */}
          <div>
            <label className="text-sm text-gray-600">Tồn kho</label>
            <input
              type="number"
              value={localWeight.stock ?? 0}
              onChange={(e) => handleChange("stock", Number(e.target.value))}
              className="mt-1 w-full border px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-2 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded-lg hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={() => onSave(localWeight)}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
          >
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
}
