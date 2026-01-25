import type { Product } from "../../types/product";

const PRODUCT_IMAGE =
  "https://res.cloudinary.com/dqucswhro/image/upload/v1769333596/kopiko_skfkhw.webp";

/* =========
 * Fake data – chỉ dùng tạm
 * ========= */
const bestSellerProducts: Product[] = [
  {
    id: 1,
    name: "Kẹo Kopiko Coffee",
    slug: "keo-kopiko-coffee",
    shortDescription: "Kẹo cà phê thơm đậm – tỉnh táo tức thì",
    brand: "Kopiko",
    tags: ["bestseller", "coffee"],
    status: "active",
    ratingAverage: 4.8,
    ratingCount: 320,
    categoryId: 1,
    variants: [
      {
        id: 101,
        productId: 1,
        flavor: "Coffee",
        flavorCode: "COFFEE",
        status: "in_stock",
        images: [PRODUCT_IMAGE],
        weightVariants: [{ weight: "120g", price: 18000, stock: 50 }],
      },
    ],
  },
  {
    id: 2,
    name: "Kẹo Kopiko Cappuccino",
    slug: "keo-kopiko-cappuccino",
    shortDescription: "Vị cappuccino béo nhẹ – ngọt vừa",
    brand: "Kopiko",
    tags: ["bestseller"],
    status: "active",
    ratingAverage: 4.6,
    ratingCount: 210,
    categoryId: 1,
    variants: [
      {
        id: 102,
        productId: 2,
        flavor: "Cappuccino",
        flavorCode: "CAPPU",
        status: "in_stock",
        images: [PRODUCT_IMAGE],
        weightVariants: [{ weight: "120g", price: 18000, stock: 40 }],
      },
    ],
  },
];

/* =========
 * Component
 * ========= */
export default function BestSellerSection() {
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          🔥 Sản phẩm bán chạy
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {bestSellerProducts.map((product) => {
            const variant = product.variants[0];
            const price = variant.weightVariants[0]?.price;

            return (
              <div
                key={product.id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition flex flex-col p-4"
              >
                <div className="relative aspect-square mb-3">
                  <img
                    src={PRODUCT_IMAGE}
                    alt={product.name}
                    className="absolute inset-0 w-full h-full object-contain rounded-xl"
                  />
                </div>

                <h3 className="font-semibold text-sm sm:text-base line-clamp-2">
                  {product.name}
                </h3>

                <p className="text-xs sm:text-sm text-gray-500 line-clamp-2 mb-2">
                  {product.shortDescription}
                </p>

                <div className="mt-auto flex items-center justify-between mb-3">
                  <span className="text-orange-500 font-bold">
                    {price.toLocaleString("vi-VN")}đ
                  </span>
                  <span className="text-yellow-500 text-sm">
                    ⭐ {product.ratingAverage.toFixed(1)}
                  </span>
                </div>

                <button className="w-full py-2 rounded-xl bg-orange-500 text-white font-semibold hover:bg-orange-600 transition">
                  Mua ngay
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
