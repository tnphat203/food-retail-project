import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../constants/routes";
import { loginApi } from "../../services/auth.api";
import { useAuthStore } from "../../store/authStore";

export default function LoginPage() {
  const navigate = useNavigate();
  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    try {
      setLoading(true);

      const { accessToken, user } = await loginApi({ email, password });
      setAuth(accessToken, user);

      navigate(ROUTES.HOME, { replace: true });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Đăng nhập thất bại");
      } else {
        alert("Đã xảy ra lỗi, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay lại 👋"
      bannerTitle="Snack ngon – Giao nhanh ⚡"
      bannerDescription="Bánh kẹo, đồ ăn vặt cho mọi khoảnh khắc 🍿🍫"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Mật khẩu"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          type="submit"
          disabled={loading}
          className="
            w-full py-2 rounded-lg text-white
            bg-orange-500 hover:bg-orange-600
            disabled:opacity-60
          "
        >
          {loading ? "Đang đăng nhập..." : "Đăng nhập"}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-500">
        Chưa có tài khoản?{" "}
        <Link to={ROUTES.REGISTER} className="text-orange-500 hover:underline">
          Đăng ký
        </Link>
      </p>
    </AuthLayout>
  );
}
