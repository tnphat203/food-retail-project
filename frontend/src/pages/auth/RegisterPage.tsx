import { Link, useNavigate } from "react-router-dom";
import { ROUTES } from "../../constants/routes";

export default function RegisterPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // TODO: gọi API register sau
    // fake đăng ký thành công → về login
    navigate(ROUTES.LOGIN, { replace: true });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-semibold text-center mb-6">
          Đăng ký tài khoản
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Họ và tên"
            required
            className="w-full border px-4 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="email"
            placeholder="Email"
            required
            className="w-full border px-4 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <input
            type="password"
            placeholder="Mật khẩu"
            required
            className="w-full border px-4 py-2 rounded-lg
                       focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <button
            type="submit"
            className="w-full bg-orange-500 text-white py-2 rounded-lg
                       hover:bg-orange-600 transition"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-sm text-center mt-4 text-gray-600">
          Đã có tài khoản?{" "}
          <Link to={ROUTES.LOGIN} className="text-orange-500 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
}
