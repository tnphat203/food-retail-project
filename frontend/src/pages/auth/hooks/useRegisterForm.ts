import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { ROUTES } from "@constants/routes";
import { registerApi } from "@services/auth.api";

type Gender = "male" | "female" | "other";

interface RegisterForm {
  firstName: string;
  lastName: string;
  gender: Gender;
  phone: string;
  email: string;
  password: string;
}

export function useRegisterForm() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    gender: "male",
    phone: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const updateField = (field: keyof RegisterForm, value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (errorMsg) {
      setErrorMsg(null);
    }
  };

  const validate = (data: RegisterForm) => {
    if (!data.lastName) return "Vui lòng nhập họ";
    if (!data.firstName) return "Vui lòng nhập tên";

    if (!data.gender) return "Vui lòng chọn giới tính";

    if (!data.phone) return "Vui lòng nhập số điện thoại";
    if (!/^0\d{9}$/.test(data.phone))
      return "Số điện thoại không hợp lệ (vd: 0912345678)";

    if (!data.email) return "Vui lòng nhập email";
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Email không hợp lệ";

    if (!data.password) return "Vui lòng nhập mật khẩu";
    if (data.password.length < 6) return "Mật khẩu tối thiểu 6 ký tự";

    return null;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return;

    setErrorMsg(null);

    const data: RegisterForm = {
      firstName: form.firstName.trim(),
      lastName: form.lastName.trim(),
      gender: form.gender,
      phone: form.phone.trim(),
      email: form.email.trim().toLowerCase(),
      password: form.password.trim(),
    };

    const validationError = validate(data);

    if (validationError) {
      setErrorMsg(validationError);
      return;
    }

    try {
      setLoading(true);

      await registerApi(data);

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
    updateField,
    loading,
    errorMsg,
    showPassword,
    setShowPassword,
    handleSubmit,
  };
}