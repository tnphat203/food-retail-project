import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import type { CategoryTree } from "../../types/categories";
import { getCategoryTree } from "../../api/category.api";
import CategoryDesktop from "./CategoryDesktop";
import CategoryMobileDrawer from "./CategoryMobileDrawer";

export default function CategoryMenu() {
  const navigate = useNavigate();
  const [openMobile, setOpenMobile] = useState(false);
  const [categories, setCategories] = useState<CategoryTree[]>([]);
  const [loading, setLoading] = useState(true);

  const go = (path: string) => {
    navigate(`/category/${path}`);
    setOpenMobile(false);
  };

  useEffect(() => {
    console.log("[CategoryMenu] mounted");

    getCategoryTree()
      .then((data) => {
        console.log("[CategoryMenu] category data:", data);
        setCategories(data);
      })
      .catch((err) => {
        console.error("[CategoryMenu] Failed to load categories", err);
      })
      .finally(() => {
        console.log("[CategoryMenu] loading done");
        setLoading(false);
      });
  }, []);

  return (
    <>
      {/* Mobile Button */}
      <button
        onClick={() => setOpenMobile(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border
                   hover:bg-gray-50 transition lg:hidden"
      >
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium">Danh mục</span>
      </button>

      {/* Desktop Mega Menu */}
      {!loading && <CategoryDesktop categories={categories} go={go} />}

      {/* Mobile Drawer */}
      <CategoryMobileDrawer
        open={openMobile}
        onClose={() => setOpenMobile(false)}
        categories={categories}
        go={go}
      />
    </>
  );
}
