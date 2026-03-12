import { Navigate, Outlet, useLocation } from "react-router-dom";
import { ROUTES } from "@constants/routes";
import { useAuthStore } from "@store/authStore";

export default function AdminProtectedRoute() {
  const location = useLocation();

  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const user = useAuthStore((s) => s.user);
  const hydrated = useAuthStore((s) => s.hydrated);

  if (!hydrated) return null;

  if (!isAuthenticated) {
    return (
      <Navigate to={ROUTES.LOGIN} replace state={{ from: location.pathname }} />
    );
  }

  if (user?.role !== "admin") {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
}
