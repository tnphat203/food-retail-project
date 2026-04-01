import { useState } from "react";
import type { Product } from "@/types/product";
import { patchProductApi } from "@services/product.api";

interface ConfirmDialogState {
  open: boolean;
  productId?: number;
}

interface ToastState {
  open: boolean;
  message: string;
  type?: "success" | "error";
}

export function useAdminProductStatus(
  products: Product[],
  setProducts: (products: Product[]) => void,
  viewProduct: Product | null,
  setViewProduct: (p: Product | null) => void
) {
  const [confirmDialog, setConfirmDialog] = useState<ConfirmDialogState>({ open: false });
  const [toast, setToast] = useState<ToastState>({
    open: false,
    message: "",
    type: "success",
  });

  const toggleProductStatus = async (product: Product) => {
    try {
      const newStatus = product.status === "active" ? "inactive" : "active";
      const updated = await patchProductApi(product.id, { status: newStatus });

      const idx = products.findIndex((p) => p.id === product.id);
      if (idx >= 0) {
        const newData = [...products];
        newData[idx] = updated.product;
        setProducts(newData);
      }

      if (viewProduct?.id === product.id) {
        setViewProduct(updated.product);
      }

      setToast({
        open: true,
        message: `Sản phẩm đã ${newStatus === "active" ? "mở khoá" : "khoá"} thành công`,
        type: "success",
      });

      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
    } catch (err) {
      console.error("toggleProductStatus error", err);

      setToast({
        open: true,
        message: "Có lỗi xảy ra, vui lòng thử lại",
        type: "error",
      });

      setTimeout(() => setToast((t) => ({ ...t, open: false })), 2500);
    }
  };

  return {
    confirmDialog,
    setConfirmDialog,
    toast,
    toggleProductStatus,
  };
}