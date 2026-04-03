import { useState } from "react";
import type { ProductVariant } from "@/types/product-variant";
import type { ProductVariantWeight } from "@/types/product-variant-weight";
import EditWeightModal from "./EditWeightModal";

interface Props {
  variant: ProductVariant;
  onClose: () => void;
  onUpdate: (updated: ProductVariant) => void;
}

export default function VariantDetailModal({
  variant,
  onClose,
  onUpdate,
}: Props) {
  const [editableWeights, setEditableWeights] = useState<
    ProductVariantWeight[]
  >(variant.weights);
  const [editingIdx, setEditingIdx] = useState<number | null>(null);

  const handleSaveWeight = (updated: ProductVariantWeight) => {
    if (editingIdx === null) return;
    const updatedWeights = [...editableWeights];
    updatedWeights[editingIdx] = updated;
    setEditableWeights(updatedWeights);
    setEditingIdx(null);

    // gọi callback để cập nhật variant parent
    onUpdate({ ...variant, weights: updatedWeights });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white w-[600px] max-h-[80vh] overflow-y-auto rounded-xl shadow-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">{variant.flavor} - Chi tiết</h3>
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Đóng
          </button>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {editableWeights.map((w, idx) => (
            <div
              key={w.id}
              onClick={() => setEditingIdx(idx)}
              className="border rounded-lg p-3 cursor-pointer hover:shadow-sm text-center"
            >
              <div className="font-medium">{w.weight ?? 0}</div>
              <div className="text-sm text-gray-500 mt-1">
                Tồn: {w.stock ?? 0}
              </div>
              <div className="text-sm text-gray-500 mt-1">
                Giá: {(w.discountPrice ?? w.price ?? 0).toLocaleString()}₫
              </div>
            </div>
          ))}
        </div>
      </div>

      {editingIdx !== null && (
        <EditWeightModal
          weight={editableWeights[editingIdx]}
          onSave={handleSaveWeight}
          onClose={() => setEditingIdx(null)}
        />
      )}
    </div>
  );
}
