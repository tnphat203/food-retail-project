import Hero from "@components/home/Hero";
import BestSellerSection from "@/components/home/BestRatingSection";
import { useEffect, useState } from "react";
import type { Product } from "@/types/product";
import { getTopRatedProductsApi } from "@services/product.api";

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadTopRatedProducts() {
      try {
        setLoading(true);
        const topProducts = await getTopRatedProductsApi();
        setProducts(topProducts);
      } catch (error) {
        console.error("Failed to load top-rated products", error);
      } finally {
        setLoading(false);
      }
    }

    loadTopRatedProducts();
  }, []);

  return (
    <>
      <Hero />
      {loading ? (
        <p className="text-center py-10">Đang tải sản phẩm...</p>
      ) : (
        <BestSellerSection products={products} />
      )}
    </>
  );
}
