import { useMemo, useState } from "react";
import { validateProductForm, type EditProductForm, type ProductFormErrors } from "./productEditValidator";

export function useProductEditForm(form: EditProductForm | null) {
  const [touched, setTouched] = useState<Partial<Record<keyof EditProductForm, boolean>>>({});

  const errors: ProductFormErrors = useMemo(
    () => (form ? validateProductForm(form) : {}),
    [form]
  );

  const markTouched = (field: keyof EditProductForm) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  const markAllTouched = () => {
    if (!form) return;
    const all: Partial<Record<keyof EditProductForm, boolean>> = {};
    (Object.keys(form) as (keyof EditProductForm)[]).forEach((k) => {
      all[k] = true;
    });
    setTouched(all);
  };

  const getFieldError = (field: keyof EditProductForm) => {
    if (!touched[field]) return undefined;
    return errors[field];
  };

  const isValid = () => {
    markAllTouched();
    return Object.keys(errors).length === 0;
  };

  const resetTouched = () => setTouched({});

  return { errors, getFieldError, markTouched, markAllTouched, isValid, resetTouched };
}