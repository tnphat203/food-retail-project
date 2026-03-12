import { useMemo, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

import { ROUTES } from "@constants/routes";
import { loginApi } from "@services/auth.api";
import { useAuthStore } from "@store/authStore";

type LocationState = {
  from?: string;
};

export function useLoginForm() {
  const navigate = useNavigate();
  const location = useLocation();

  const setAuth = useAuthStore((state) => state.setAuth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const emailTrimmed = useMemo(() => email.trim(), [email]);
  const passwordTrimmed = useMemo(() => password.trim(), [password]);

  const validate = () => {
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

      const { accessToken, user } = await loginApi({
        email: emailTrimmed,
        password: passwordTrimmed,
      });

      setAuth(accessToken, user);

      const state = location.state as LocationState | null;
      const redirectTo = state?.from;

      const isAdmin = user?.role === "admin";

      if (redirectTo) {
        if (redirectTo.startsWith("/admin") && !isAdmin) {
          navigate(ROUTES.HOME, { replace: true });
          return;
        }

        navigate(redirectTo, { replace: true });
        return;
      }

      navigate(isAdmin ? ROUTES.ADMIN_DASHBOARD : ROUTES.HOME, {
        replace: true,
      });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        setErrorMsg(error.response?.data?.message || "Đăng nhập thất bại");
      } else {
        setErrorMsg("Đã xảy ra lỗi, vui lòng thử lại");
      }

      setPassword("");
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    loading,
    errorMsg,
    showPassword,
    setShowPassword,
    handleSubmit,
  };
}
