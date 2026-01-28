import { Menu } from "lucide-react";

import CategoryDesktop from "./CategoryDesktop";
import CategoryMobileDrawer from "./CategoryMobileDrawer";
import { useCategoryMenu } from "./hooks/useCategoryMenu";

export default function CategoryMenu() {
  const { openMobile, setOpenMobile, categories, loading, go } =
    useCategoryMenu();

  return (
    <>
      <button
        onClick={() => setOpenMobile(true)}
        className="flex items-center gap-2 px-4 py-2 rounded-full border
                   hover:bg-gray-50 transition lg:hidden"
      >
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium">Danh mục</span>
      </button>

      {!loading && <CategoryDesktop categories={categories} go={go} />}

      <CategoryMobileDrawer
        open={openMobile}
        onClose={() => setOpenMobile(false)}
        categories={categories}
        go={go}
      />
    </>
  );
}
