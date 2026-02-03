import { NavLink, Outlet } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

const navItems = [
  { label: "Dashboard", to: ROUTES.ADMIN_DASHBOARD },
  { label: "Products", to: ROUTES.ADMIN_PRODUCTS },
  { label: "Orders", to: ROUTES.ADMIN_ORDERS },
  { label: "Users", to: ROUTES.ADMIN_USERS },
  { label: "Vouchers", to: ROUTES.ADMIN_VOUCHERS },
  { label: "Reviews", to: ROUTES.ADMIN_REVIEWS },

  { label: "Settings", to: ROUTES.ADMIN_SETTINGS },
];

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 flex">
      <aside className="w-[260px] bg-white border-r border-gray-200 p-4">
        <div className="mb-6">
          <h2 className="text-lg font-bold text-gray-900">GoSnack Admin</h2>
          <p className="text-xs text-gray-500">Quản trị hệ thống GoSnack</p>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `block px-3 py-2 rounded-lg text-sm font-medium transition ${
                  isActive
                    ? "bg-orange-50 text-orange-600"
                    : "text-gray-600 hover:bg-gray-100"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="flex-1 flex flex-col">
        <main className="p-6 flex-1">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
