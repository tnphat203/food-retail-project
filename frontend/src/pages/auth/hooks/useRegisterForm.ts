import { useMemo, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ROUTES } from "../../../constants/routes";
import { registerApi } from "../../../services/auth.api";

type Gender = "male" | "female" | "other";

export function useRegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    gender: "male" as Gender,
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const firstNameTrimmed = useMemo(() => form.firstName.trim(), [form.firstName]);
  const lastNameTrimmed = useMemo(() => form.lastName.trim(), [form.lastName]);
  const phoneTrimmed = useMemo(() => form.phone.trim(), [form.phone]);
  const emailTrimmed = useMemo(
    () => form.email.trim().toLowerCase(),
    [form.email]
  );
  const passwordTrimmed = useMemo(() => form.password.trim(), [form.password]);

  const validate = () => {
    if (!lastNameTrimmed) return "Vui lòng nhập họ";
    if (!firstNameTrimmed) return "Vui lòng nhập tên";

    if (!form.gender) return "Vui lòng chọn giới tính";

    if (!phoneTrimmed) return "Vui lòng nhập số điện thoại";
    if (!/^0\d{9}$/.test(phoneTrimmed))
      return "Số điện thoại không hợp lệ (vd: 0912345678)";

    if (!emailTrimmed) return "Vui lòng nhập email";
    if (!/^\S+@\S+\.\S+$/.test(emailTrimmed)) return "Email không hợp lệ";

    if (!passwordTrimmed) return "Vui lòng nhập mật khẩu";
    if (passwordTrimmed.length < 6) return "Mật khẩu tối thiểu 6 ký tự";

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);

    const validationError = validate();
    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerApi({
        firstName: firstNameTrimmed,
        lastName: lastNameTrimmed,
        gender: form.gender,
        phone: phoneTrimmed,
        email: emailTrimmed,
        password: passwordTrimmed,
      });

      navigate(ROUTES.LOGIN, {
        replace: true,
        state: { message: "Đăng ký thành công 🎉 Vui lòng đăng nhập" },
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data?.message || "Đăng ký thất bại");
      } else {
        setErrorMsg("Đã xảy ra lỗi, vui lòng thử lại");
      }
    } finally {
      setLoading(false);
    }
  };

  return {
    form,
    setForm,
    loading,
    errorMsg,
    showPassword,
    setShowPassword,
    handleSubmit,
  };
}
