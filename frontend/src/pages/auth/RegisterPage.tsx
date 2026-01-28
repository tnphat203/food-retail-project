import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../constants/routes";
import { registerApi } from "../../services/auth.api";

export default function RegisterPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameParts = form.name.trim().split(" ");
    const lastName = nameParts.pop() || "";
    const firstName = nameParts.join(" ") || lastName;

    try {
      setLoading(true);

      await registerApi({
        firstName,
        lastName,
        email: form.email,
        password: form.password,
      });

      alert("Đăng ký thành công 🎉");
      navigate(ROUTES.LOGIN);
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        alert(error.response?.data?.message || "Đăng ký thất bại");
      } else {
        alert("Đã xảy ra lỗi không xác định");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      subtitle="Tạo tài khoản mới chỉ trong vài giây ✨"
      bannerTitle="Tham gia GoSnack 🎉"
      bannerDescription="Khám phá thế giới bánh kẹo & đồ ăn vặt 🍪🍫"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Họ và tên"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="Email"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <input
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          placeholder="Mật khẩu"
          required
          className="w-full px-4 py-2 border rounded-lg"
        />

        <button
          disabled={loading}
          className="
            w-full py-2 rounded-lg text-white
            bg-orange-500 hover:bg-orange-600
            disabled:opacity-60
          "
        >
          {loading ? "Đang đăng ký..." : "Đăng ký"}
        </button>
      </form>

      <p className="mt-6 text-sm text-center text-gray-600">
        Đã có tài khoản?{" "}
        <Link to={ROUTES.LOGIN} className="text-orange-500 hover:underline">
          Đăng nhập
        </Link>
      </p>
    </AuthLayout>
  );
}
