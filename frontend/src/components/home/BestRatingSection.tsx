import type { Product } from "@/types/product";
import type { ProductUI } from "@/types/product-ui";
import { useMemo, useState } from "react";

import AdminPagination from "@components/ui/AdminPagination";
import ProductCard from "@components/ui/ProductCard";

import { mapProductUI } from "@/mappers/product.mapper";

interface BestRatingSectionProps {
  products: Product[];
}

export default function BestRatingSection({
  products,
}: BestRatingSectionProps) {
  const limitPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);

  const mappedProducts: ProductUI[] = useMemo(() => {
    return products?.map(mapProductUI) ?? [];
  }, [products]);

  const totalPages = Math.ceil(mappedProducts.length / limitPerPage);

  const productsToShow: ProductUI[] = useMemo(() => {
    const startIndex = (currentPage - 1) * limitPerPage;
    return mappedProducts.slice(startIndex, startIndex + limitPerPage);
  }, [currentPage, mappedProducts]);

  if (!mappedProducts.length) {
    return (
      <p className="text-center py-10 text-gray-500">Không có sản phẩm nào</p>
    );
  }

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center">
          🔥 Sản phẩm được khách hàng yêu thích
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {productsToShow.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <AdminPagination
              page={currentPage}
              totalPages={totalPages}
              total={mappedProducts.length}
              limit={limitPerPage}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>
    </section>
  );
}
