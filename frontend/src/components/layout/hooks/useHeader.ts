import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { useAuthStore } from "../../../store/authStore";
import { logoutApi } from "../../../services/auth.api";

export function useHeader() {
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, clearAuth } = useAuthStore();

  const [openUserMenu, setOpenUserMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  const avatarSrc = useMemo(() => {
    if (!user?.avatar) return null;
    return user.avatar;
  }, [user?.avatar]);

  useEffect(() => {
    if (!isAuthenticated) setOpenUserMenu(false);
  }, [isAuthenticated]);

  useEffect(() => {
    setOpenUserMenu(false);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(event.target as Node)) {
        setOpenUserMenu(false);
      }
    };

    if (openUserMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [openUserMenu]);

  const handleLogout = async () => {
    try {
      await logoutApi();
    } catch {
      //
    } finally {
      clearAuth();
      setOpenUserMenu(false);
      navigate("/login");
    }
  };

  const handleClickUser = () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    setOpenUserMenu((v) => !v);
  };

  const goHome = () => navigate("/");
  const goCart = () => navigate("/cart");
  const goProfile = () => navigate("/profile");
  const goOrders = () => navigate("/orders");

  return {
    user,
    isAuthenticated,
    openUserMenu,
    setOpenUserMenu,
    menuRef,
    avatarSrc,
    handleLogout,
    handleClickUser,
    goHome,
    goCart,
    goProfile,
    goOrders,
  };
}
