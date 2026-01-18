import { Menu } from "lucide-react";
import type { CategoryTree } from "../../types/categories";

type Props = {
  categories: CategoryTree[];
  go: (path: string) => void;
};

export default function CategoryDesktop({ categories, go }: Props) {
  return (
    <div className="relative group hidden lg:block">
      <button className="flex items-center gap-2 px-4 py-2 rounded-full border hover:bg-gray-50">
        <Menu className="w-5 h-5" />
        <span className="text-sm font-medium">Danh mục</span>
      </button>

      <div
        className="absolute left-0 mt-3 w-[900px] rounded-2xl bg-white shadow-xl
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
      >
        <div className="p-6 grid grid-cols-3 gap-8">
          {categories.map((parent) => (
            <div key={parent.id}>
              <div
                onClick={() => go(parent.path)}
                className="mb-3 font-semibold text-gray-800 hover:text-orange-500 cursor-pointer"
              >
                {parent.name}
              </div>

              <ul className="space-y-2">
                {parent.children?.slice(0, 6).map((child) => (
                  <li
                    key={child.id}
                    onClick={() => go(child.path)}
                    className="text-sm text-gray-600 hover:text-orange-500 cursor-pointer"
                  >
                    {child.name}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => go(parent.path)}
                className="mt-3 text-sm text-orange-500 hover:underline"
              >
                Xem tất cả →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
