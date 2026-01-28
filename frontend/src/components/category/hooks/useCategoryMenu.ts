import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { CategoryTree } from "../../../types/categories";
import { getCategoryTree } from "../../../api/category.api";

export function useCategoryMenu() {
  const navigate = useNavigate();

  const [openMobile, setOpenMobile] = useState(false);
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);

  const go = (path: string) => {
    navigate(`/category/${path}`);
    setOpenMobile(false);
  };

  useEffect(() => {
    getCategoryTree()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        console.error("[CategoryMenu] Failed to load categories", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return {
    openMobile,
    setOpenMobile,
    categories,
    loading,
    go,
  };
}
