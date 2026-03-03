import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../constants/routes";

import TextInput from "../../components/ui/TextInput";
import PasswordInput from "../../components/ui/PasswordInput";
import ErrorBox from "../../components/ui/ErrorBox";
import SubmitButton from "../../components/ui/SubmitButton";

import { useLoginForm } from "../../hooks/auth/useLoginForm";

export default function LoginPage() {
  const {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMsg,
    showPassword,
    setShowPassword,
    handleSubmit,
  } = useLoginForm();

  return (
    <AuthLayout
      title="Đăng nhập"
      subtitle="Chào mừng bạn quay lại 👋"
      bannerTitle="Snack ngon – Giao nhanh ⚡"
      bannerDescription="Bánh kẹo, đồ ăn vặt cho mọi khoảnh khắc 🍿🍫"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <TextInput
          label="Email"
          type="email"
          value={email}
          disabled={loading}
          placeholder="vd: abc@gmail.com"
          onChange={setEmail}
        />

        <PasswordInput
          label="Mật khẩu"
          value={password}
          disabled={loading}
          placeholder="Nhập mật khẩu"
          showPassword={showPassword}
          onToggleShow={() => setShowPassword((prev) => !prev)}
          onChange={setPassword}
        />

        <ErrorBox message={errorMsg} />

        <SubmitButton
          loading={loading}
          text="Đăng nhập"
          loadingText="Đang đăng nhập..."
        />
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
