import { useState } from "react";
import type { CreateVariantPayloadWithoutImages } from "@/services/product-variant.api";
import type { ProductVariant } from "@/types/product-variant";

interface Props {
  onClose: () => void;
  onSave: (
    payload: CreateVariantPayloadWithoutImages,
  ) => Promise<ProductVariant | null>;
}

export default function AddVariantModal({ onClose, onSave }: Props) {
  const [flavor, setFlavor] = useState("");
  const [flavorCode, setFlavorCode] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">("");
  const [stock, setStock] = useState<number | "">("");
  const [loading, setLoading] = useState(false);

  const isValid =
    flavor.trim() &&
    Number(weight) > 0 &&
    Number(price) > 0 &&
    Number(stock) >= 0;

  const resetForm = () => {
    setFlavor("");
    setFlavorCode("");
    setWeight("");
    setPrice("");
    setStock("");
  };

  const handleSave = async () => {
    if (!isValid) return;

    setLoading(true);

    const payload: CreateVariantPayloadWithoutImages = {
      flavor: flavor.trim(),
      ...(flavorCode.trim() && { flavorCode: flavorCode.trim() }),
      weights: [
        {
          weight: Number(weight),
          price: Number(price),
          stock: Number(stock),
        },
      ],
    };

    try {
      const result = await onSave(payload);

      if (result) {
        resetForm();
        onClose();
      }
    } catch (err) {
      console.error("Thêm biến thể thất bại", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[420px] rounded-xl shadow-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Thêm biến thể mới</h3>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            value={flavor}
            onChange={(e) => setFlavor(e.target.value)}
            placeholder="Tên biến thể (Flavor)"
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="text"
            value={flavorCode}
            onChange={(e) => setFlavorCode(e.target.value)}
            placeholder="Mã biến thể (không bắt buộc)"
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="number"
            value={weight}
            min={0}
            onChange={(e) =>
              setWeight(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Trọng lượng (g)"
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="number"
            value={price}
            min={0}
            onChange={(e) =>
              setPrice(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Giá (₫)"
            className="border px-3 py-2 rounded w-full"
          />

          <input
            type="number"
            value={stock}
            min={0}
            onChange={(e) =>
              setStock(e.target.value === "" ? "" : Number(e.target.value))
            }
            placeholder="Tồn kho"
            className="border px-3 py-2 rounded w-full"
          />
        </div>

        <div className="flex justify-end gap-2 mt-5">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Hủy
          </button>

          <button
            onClick={handleSave}
            disabled={loading || !isValid}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Đang lưu..." : "Lưu"}
          </button>
        </div>
      </div>
    </div>
  );
}
