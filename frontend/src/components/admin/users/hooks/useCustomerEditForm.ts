import { useEffect, useMemo, useRef, useState } from "react";
import {
  validateCustomerEditForm,
  type EditForm,
  type FormErrors,
} from "./customerEditValidator";

type ToastType = "success" | "error";

export function useCustomerEditForm({
  form,
  onSave,
  onClose,
}: {
  form: EditForm | null;
  onSave: () => Promise<void>;
  onClose: () => void;
}) {
  const [touched, setTouched] = useState<
    Partial<Record<keyof EditForm, boolean>>
  >({});

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as ToastType,
  });

  const toastTimer = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const showToast = (type: ToastType, message: string, ms = 1800) => {
    setToast({ open: true, type, message });
    if (toastTimer.current) clearTimeout(toastTimer.current);

    toastTimer.current = window.setTimeout(() => {
      setToast((p) => ({ ...p, open: false }));
    }, ms);
  };

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const errors: FormErrors = useMemo(
    () => validateCustomerEditForm(form),
    [form]
  );

  const markAllTouched = () => {
    if (!form) return;
    const all: Partial<Record<keyof EditForm, boolean>> = {};
    (Object.keys(form) as (keyof EditForm)[]).forEach((k) => (all[k] = true));
    setTouched(all);
  };

  const getFieldError = (field: keyof EditForm) =>
    touched[field] ? errors[field] : undefined;

  const markTouched = (field: keyof EditForm) =>
    setTouched((p) => ({ ...p, [field]: true }));

  const handleSave = async () => {
    if (!form) return;
    markAllTouched();

    if (Object.keys(errors).length > 0) {
      showToast("error", "Vui lòng kiểm tra lại dữ liệu!");
      return;
    }

    try {
      await onSave();
      showToast("success", "Lưu thành công!");
    } catch (err: unknown) {
      const status =
        (err as { response?: { status?: number } })?.response?.status;

      if (status === 409) {
        showToast("error", "Email đã tồn tại!");
      } else {
        showToast("error", "Lưu thất bại!");
      }
    }
  };

  const handleClose = () => {
    setTouched({});
    setToast({ open: false, message: "", type: "success" });
    onClose();
  };

  return {
    toast,
    errors,
    getFieldError,
    markTouched,
    handleSave,
    handleClose,
  };
}