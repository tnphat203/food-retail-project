import { useNavigate } from "react-router-dom";
import Logo from "./Logo";
import CategoryMenu from "../category/CategoryMenu";
import { Search, ShoppingCart, User, Phone } from "lucide-react";

export default function Header() {
  const navigate = useNavigate();

  // Sau này lấy từ auth / context / store
  const userName = null; // ví dụ: "Phát"

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="grid grid-cols-[auto_auto_1fr_auto] items-center gap-4 px-4 md:px-8 py-3 md:py-4">
        {/* Logo */}
        <div onClick={() => navigate("/")} className="cursor-pointer shrink-0">
          <Logo />
        </div>

        {/* Category - ẩn trên mobile */}
        <div className="hidden md:block">
          <CategoryMenu />
        </div>

        {/* Search */}
        <div className="relative w-full max-w-lg xl:max-w-xl hidden md:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm bánh kẹo, đồ uống..."
            className="w-full pl-11 pr-4 py-2.5 text-sm border rounded-full
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Mobile search icon */}
        <button className="md:hidden p-2 hover:text-orange-500">
          <Search className="w-5 h-5" />
        </button>

        {/* Right actions */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Phone - chỉ desktop */}
          <a
            href="tel:0900 123 456"
            className="hidden lg:flex flex-col items-start text-sm
                       text-gray-700 hover:text-orange-500 transition"
          >
            <span className="text-[11px] text-gray-500 uppercase">
              Thông tin liên hệ
            </span>
            <div className="flex items-center gap-2 font-medium">
              <Phone className="w-4 h-4" />
              <span>0900 123 456</span>
            </div>
          </a>

          {/* Cart */}
          <button
            onClick={() => navigate("/cart")}
            className="flex items-center gap-2 hover:text-orange-500 transition"
          >
            <span className="hidden lg:inline text-sm text-gray-600">
              Giỏ hàng
            </span>
            <div className="relative">
              <ShoppingCart className="w-5 h-5" />
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                           bg-orange-500 text-white text-[10px]
                           flex items-center justify-center"
              >
                2
              </span>
            </div>
          </button>

          {/* User */}
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-2 hover:text-orange-500 transition"
          >
            <span className="hidden lg:inline text-sm text-gray-600">
              {userName || "Tài khoản"}
            </span>
            <User className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
