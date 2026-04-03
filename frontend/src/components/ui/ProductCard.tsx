import type { ProductUI } from "@/types/product-ui";

interface ProductCardProps {
  product: ProductUI;
}

export default function ProductCard({ product }: ProductCardProps) {
  const image =
    product.variants?.[0]?.weights?.[0]?.image ||
    product.image ||
    "/no-image.svg";

  const allPrices =
    product.variants?.flatMap(
      (variant) =>
        variant.weights?.map(
          (weight) => weight.discountPrice ?? weight.price,
        ) || [],
    ) ?? [];

  const minPrice = allPrices.length ? Math.min(...allPrices) : undefined;
  const maxPrice = allPrices.length ? Math.max(...allPrices) : undefined;

  const priceText =
    minPrice !== undefined && maxPrice !== undefined
      ? minPrice === maxPrice
        ? minPrice.toLocaleString("vi-VN", {
            style: "currency",
            currency: "VND",
          })
        : `${minPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })} - ${maxPrice.toLocaleString("vi-VN", { style: "currency", currency: "VND" })}`
      : "Liên hệ";

  const rating = product.ratingAverage ?? 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col p-4">
      <div className="relative aspect-square mb-3">
        <img
          src={image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-contain rounded-xl"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = "/no-image.svg";
          }}
        />
      </div>

      <h3 className="font-semibold text-sm sm:text-base line-clamp-2 mb-1">
        {product.name}
      </h3>

      {product.shortDescription && (
        <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2">
          {product.shortDescription}
        </p>
      )}

      <div className="mt-auto flex items-center justify-between mb-3">
        <span className="text-orange-500 font-bold">{priceText}</span>
        <span className="text-yellow-500 text-sm">⭐ {rating.toFixed(1)}</span>
      </div>

      <button className="w-full py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
        Mua ngay
      </button>
    </div>
  );
}
