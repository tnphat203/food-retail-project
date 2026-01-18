import { X } from "lucide-react";
import type { CategoryTree } from "../../types/categories";

type Props = {
  open: boolean;
  onClose: () => void;
  categories: CategoryTree[];
  go: (path: string) => void;
};

export default function CategoryMobileDrawer({
  open,
  onClose,
  categories,
  go,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 bg-white overflow-y-auto lg:hidden">
      <div className="flex items-center justify-between px-6 py-4 border-b">
        <span className="font-semibold text-lg">Danh mục</span>
        <button onClick={onClose}>
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="p-6 space-y-6">
        {categories.map((parent) => (
          <div key={parent.id}>
            <div
              onClick={() => go(parent.path)}
              className="font-semibold text-gray-800 mb-3 cursor-pointer"
            >
              {parent.name}
            </div>

            <div className="pl-4 space-y-2">
              {parent.children?.slice(0, 5).map((child) => (
                <div
                  key={child.id}
                  onClick={() => go(child.path)}
                  className="text-sm text-gray-600 cursor-pointer"
                >
                  {child.name}
                </div>
              ))}

              <div
                onClick={() => go(parent.path)}
                className="text-sm text-orange-500 mt-2 cursor-pointer"
              >
                Xem tất cả →
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
