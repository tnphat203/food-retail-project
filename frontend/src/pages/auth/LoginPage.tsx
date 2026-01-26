import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/authStore";
import { ROUTES } from "../../constants/routes";

export default function LoginPage() {
  const login = useAuthStore((state) => state.login);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      // 🔹 Sau này thay bằng API thật
      // const res = await authApi.login(email, password);

      const fakeResponse = {
        accessToken: "fake-access-token",
        user: {
          id: "1",
          name: "Ngọc Phát",
          email: "phat@email.com",
        },
      };

      // ✅ LƯU TOKEN + USER VÀO STORE
      login(fakeResponse.accessToken, fakeResponse.user);

      // ✅ ĐIỀU HƯỚNG
      navigate(ROUTES.HOME, { replace: true });
    } catch (error) {
      console.error("Login failed", error);
      alert("Đăng nhập thất bại");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* input email */}
      {/* input password */}
      <button type="submit">Đăng nhập</button>
    </form>
  );
}
