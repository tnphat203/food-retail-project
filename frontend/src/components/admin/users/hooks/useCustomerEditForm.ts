import { useMemo, useState } from "react";
import {
  validateCustomerInfoForm,
  type EditInfoForm,
  type InfoFormErrors,
} from "./customerEditValidator";

export function useCustomerEditForm(form: EditInfoForm | null) {
  const [touched, setTouched] = useState<
    Partial<Record<keyof EditInfoForm, boolean>>
  >({});

  const errors: InfoFormErrors = useMemo(
    () => validateCustomerInfoForm(form),
    [form]
  );

  const markTouched = (field: keyof EditInfoForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const markAllTouched = () => {
    if (!form) return;

    const all: Partial<Record<keyof EditInfoForm, boolean>> = {};

    (Object.keys(form) as (keyof EditInfoForm)[]).forEach((k) => {
      all[k] = true;
    });

    setTouched(all);
  };

  const getFieldError = (field: keyof EditInfoForm) => {
    if (!touched[field]) return undefined;
    return errors[field];
  };

  const isValid = () => {
    markAllTouched();
    return Object.keys(errors).length === 0;
  };

  const resetTouched = () => {
    setTouched({});
  };

  return {
    errors,
    getFieldError,
    markTouched,
    markAllTouched,
    isValid,
    resetTouched,
  };
}