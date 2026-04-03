import { useState, useEffect, useCallback } from "react";
import type { Product, ProductsPaginatedResponse } from "@/types/product";
import type { CategoryTree } from "@/types/categories";
import { getAllProductsApi } from "@services/product.api";
import { getCategoryTreeApi } from "@services/category.api";

interface UseAdminProductsOptions {
  initialPage?: number;
  initialLimit?: number;
  initialStatus?: "all" | Product["status"];
}

export function useAdminProducts(options?: UseAdminProductsOptions) {
  const [data, setData] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  const [page, setPage] = useState(options?.initialPage || 1);
  const [limit, setLimit] = useState(options?.initialLimit || 10);
  const [totalPages, setTotalPages] = useState(0);
  const [total, setTotal] = useState(0);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<"all" | Product["status"]>(
    options?.initialStatus || "all"
  );

  const [categoryTree, setCategoryTree] = useState<CategoryTree[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  useEffect(() => {
    const fetchCategoryTree = async () => {
      try {
        const tree = await getCategoryTreeApi();
        const allChildren: CategoryTree[] = tree.flatMap((c) => c.children || []);
        setCategoryTree(allChildren);
      } catch (err) {
        console.error("fetchCategoryTree error", err);
      }
    };
    fetchCategoryTree();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string | number> = { page, limit };
      if (search) params.search = search;
      if (status !== "all") params.status = status;
      if (selectedCategory !== "all") params.categoryId = selectedCategory;

      const res: ProductsPaginatedResponse = await getAllProductsApi(params);
      setData(res.data);
      setTotal(res.pagination.total);
      setTotalPages(res.pagination.totalPages);
    } catch (err) {
      console.error("fetchProducts error", err);
    } finally {
      setLoading(false);
    }
  }, [page, limit, search, status, selectedCategory]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (page !== 1) setPage(1);
  }, [search, status, limit, selectedCategory]);

  const reload = () => fetchData();

  return {
    data,
    setData,
    loading,
    search,
    setSearch,
    status,
    setStatus,
    limit,
    setLimit,
    page,
    goToPage: setPage,
    total,
    totalPages,
    categoryTree,
    selectedCategory: String(selectedCategory),
    setSelectedCategory: (v: string) =>
      setSelectedCategory(v === "all" ? "all" : Number(v)),
    reload, 
  };
}