import Logo from "./Logo";
import CategoryMenu from "../category/CategoryMenu";
import {
  Search,
  ShoppingCart,
  User as UserIcon,
  Phone,
  LogOut,
} from "lucide-react";

import { useHeader } from "./hooks/useHeader";

export default function Header() {
  const {
    user,
    isAuthenticated,
    openUserMenu,
    menuRef,
    avatarSrc,
    handleLogout,
    handleClickUser,
    goHome,
    goCart,
    goProfile,
    goOrders,
  } = useHeader();

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 md:px-6">
        <div className="flex items-center gap-4 py-3 md:py-4">
          <div
            className="flex items-center gap-4 cursor-pointer shrink-0"
            onClick={goHome}
          >
            <Logo />
          </div>

          <div className="hidden md:block">
            <CategoryMenu />
          </div>

          <div className="hidden md:flex flex-1 justify-center">
            <div className="relative w-full max-w-xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Tìm kiếm bánh kẹo, đồ uống..."
                className="w-full pl-11 pr-4 py-2.5 text-sm border rounded-full
                           focus:outline-none focus:ring-2 focus:ring-orange-400"
              />
            </div>
          </div>

          <div className="ml-auto flex items-center gap-4 md:gap-6 relative">
            <button className="md:hidden p-2 hover:text-orange-500">
              <Search className="w-5 h-5" />
            </button>

            <a
              href="tel:0900123456"
              className="hidden lg:flex flex-col text-sm text-gray-700 hover:text-orange-500 transition"
            >
              <span className="text-[11px] text-gray-500 uppercase">
                Thông tin liên hệ
              </span>
              <div className="flex items-center gap-2 font-medium">
                <Phone className="w-4 h-4" />
                <span>0900 123 456</span>
              </div>
            </a>

            <button
              onClick={goCart}
              className="relative flex items-center gap-2 hover:text-orange-500"
            >
              <ShoppingCart className="w-5 h-5" />
              <span
                className="absolute -top-2 -right-2 w-4 h-4 rounded-full
                           bg-orange-500 text-white text-[10px]
                           flex items-center justify-center"
              >
                2
              </span>
              <span className="hidden lg:inline text-sm text-gray-600">
                Giỏ hàng
              </span>
            </button>

            <div className="relative" ref={menuRef}>
              <button
                onClick={handleClickUser}
                className="flex items-center gap-2 hover:text-orange-500"
              >
                {avatarSrc ? (
                  <img
                    src={avatarSrc}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = "";
                    }}
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                    <UserIcon className="w-4 h-4 text-gray-500" />
                  </div>
                )}

                <span className="hidden lg:inline text-sm text-gray-600 max-w-[120px] truncate">
                  {isAuthenticated && user
                    ? `${user.firstName} ${user.lastName}`
                    : "Tài khoản"}
                </span>
              </button>

              {isAuthenticated && openUserMenu && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white border
                             rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={goProfile}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50"
                  >
                    Thông tin cá nhân
                  </button>

                  <button
                    onClick={goOrders}
                    className="w-full text-left px-4 py-3 text-sm hover:bg-orange-50"
                  >
                    Đơn hàng của tôi
                  </button>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-4 py-3
                               text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
