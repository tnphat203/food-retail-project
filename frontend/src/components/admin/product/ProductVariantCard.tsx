import type { ProductVariant } from "@/types/product-variant";
import type { ProductVariantWeight } from "@/types/product-variant-weight";

interface Props {
  variant: ProductVariant;
  onClick?: (variant: ProductVariant) => void;
}

export default function ProductVariantCard({ variant, onClick }: Props) {
  const images = variant.images ?? [];
  const weights = variant.weights ?? [];

  return (
    <div
      onClick={() => onClick?.(variant)}
      className="border rounded-xl p-4 shadow-sm bg-white cursor-pointer hover:shadow-md transition flex flex-col gap-3"
    >
      <div className="flex justify-between items-center">
        <div>
          <div className="font-semibold text-lg">{variant.flavor}</div>
          <div className="text-xs text-gray-500">
            Mã: {variant.flavorCode || "-"}
          </div>
        </div>
      </div>

      {images.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto">
          {images.map((img, i) => (
            <img
              key={i}
              src={img}
              alt={`${variant.flavor} ${i + 1}`}
              className="w-20 h-20 object-cover rounded-lg border flex-shrink-0"
            />
          ))}
        </div>
      ) : (
        <div className="w-20 h-20 bg-gray-100 flex items-center justify-center rounded-lg text-gray-400 text-xs">
          Chưa có hình
        </div>
      )}

      <div className="flex flex-wrap gap-2 mt-2">
        {weights.map((w: ProductVariantWeight, idx) => {
          const price = w.discountPrice ?? w.price ?? 0;

          const borderColor =
            (w.stock ?? 0) === 0
              ? "border-red-400"
              : (w.stock ?? 0) < 10
                ? "border-yellow-400"
                : "border-green-400";

          return (
            <div
              key={w.id ?? idx}
              className={`border ${borderColor} rounded-lg px-3 py-1 text-sm`}
            >
              {w.weight ?? 0}g - {price.toLocaleString()}₫
            </div>
          );
        })}
      </div>
    </div>
  );
}
