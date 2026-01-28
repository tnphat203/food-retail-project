import { Link } from "react-router-dom";

import AuthLayout from "../../components/auth/AuthLayout";
import { ROUTES } from "../../constants/routes";

import TextInput from "../../components/ui/TextInput";
import SelectInput from "../../components/ui/SelectInput";
import PasswordInput from "../../components/ui/PasswordInput";
import ErrorBox from "../../components/ui/ErrorBox";
import SubmitButton from "../../components/ui/SubmitButton";

import { useRegisterForm } from "./hooks/useRegisterForm";

type Gender = "male" | "female" | "other";

export default function RegisterPage() {
  const {
    form,
    setForm,
    loading,
    errorMsg,
    showPassword,
    setShowPassword,
    handleSubmit,
  } = useRegisterForm();

  return (
    <AuthLayout
      title="Đăng ký tài khoản"
      subtitle="Tạo tài khoản mới chỉ trong vài giây ✨"
      bannerTitle="Tham gia GoSnack 🎉"
      bannerDescription="Khám phá thế giới bánh kẹo & đồ ăn vặt 🍪🍫"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <TextInput
            label="Họ"
            value={form.lastName}
            disabled={loading}
            placeholder="vd: Trần"
            onChange={(v) => setForm({ ...form, lastName: v })}
          />

          <TextInput
            label="Tên"
            value={form.firstName}
            disabled={loading}
            placeholder="vd: Ngọc Phát"
            onChange={(v) => setForm({ ...form, firstName: v })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <SelectInput
            label="Giới tính"
            value={form.gender}
            disabled={loading}
            options={[
              { label: "Nam", value: "male" },
              { label: "Nữ", value: "female" },
              { label: "Khác", value: "other" },
            ]}
            onChange={(v) => setForm({ ...form, gender: v as Gender })}
          />

          <TextInput
            label="Số điện thoại"
            value={form.phone}
            disabled={loading}
            placeholder="vd: 0912345678"
            inputMode="numeric"
            onChange={(v) =>
              setForm({ ...form, phone: v.replace(/[^\d]/g, "") })
            }
          />
        </div>

        <TextInput
          label="Email"
          type="email"
          value={form.email}
          disabled={loading}
          placeholder="vd: abc@gmail.com"
          onChange={(v) => setForm({ ...form, email: v })}
        />

        <PasswordInput
          label="Mật khẩu"
          value={form.password}
          disabled={loading}
          placeholder="Tối thiểu 6 ký tự"
          showPassword={showPassword}
          onToggleShow={() => setShowPassword((prev) => !prev)}
          onChange={(v) => setForm({ ...form, password: v })}
        />

        <ErrorBox message={errorMsg} />

        <SubmitButton
          loading={loading}
          text="Đăng ký"
          loadingText="Đang đăng ký..."
        />
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
