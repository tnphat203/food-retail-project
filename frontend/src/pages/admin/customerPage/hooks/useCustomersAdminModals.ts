import { useState } from "react";

import type { User } from "@/types/user";
import type {
  EditInfoForm,
  AvatarValue,
} from "@components/admin/users/hooks/customerEditValidator";

import { validateCustomerAvatar } from "@components/admin/users/hooks/customerEditValidator";

import { useCustomerEditForm } from "@components/admin/users/hooks/useCustomerEditForm";

import {
  updateUserInfoApi,
  updateUserAvatarApi,
  changeUserStatusApi,
} from "@services/users.api";

type ToastType = "success" | "error";

export function useCustomersAdminModals(opts: { onReload: () => void }) {
  const { onReload } = opts;

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);

  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditInfoForm | null>(null);

  const [avatarValue, setAvatarValue] = useState<AvatarValue>(undefined);

  const [toast, setToast] = useState({
    open: false,
    message: "",
    type: "success" as ToastType,
  });

  const formValidator = useCustomerEditForm(editForm);

  const showToast = (type: ToastType, msg: string) => {
    setToast({
      open: true,
      message: msg,
      type,
    });

    setTimeout(() => {
      setToast((t) => ({ ...t, open: false }));
    }, 1800);
  };

  const openEdit = (u: User) => {
    setEditUser(u);

    setEditForm({
      firstName: u.firstName ?? "",
      lastName: u.lastName ?? "",
      email: u.email ?? "",
      phone: u.phone ?? "",
      gender: u.gender ?? "other",
      status: u.status ?? "active",
      dateOfBirth: u.dateOfBirth ?? "",
    });

    setAvatarValue(u.avatar ?? undefined);

    formValidator.resetTouched();
  };

  const closeEdit = () => {
    setEditUser(null);
    setEditForm(null);
    setAvatarValue(undefined);
    formValidator.resetTouched();
  };

  const handleSaveInfo = async () => {
    if (!editUser || !editForm) return;

    if (!formValidator.isValid()) return;

    try {
      await updateUserInfoApi(editUser.id, {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone,
        gender: editForm.gender,
        status: editForm.status,
        dateOfBirth: editForm.dateOfBirth || null,
      });

      showToast("success", "Cập nhật thông tin thành công");

      setTimeout(() => {
        closeEdit();
        onReload();
      }, 1200);
    } catch {
      showToast("error", "Cập nhật thông tin thất bại");
    }
  };

  const handleSaveAvatar = async () => {
    const user = editUser ?? viewUser;
    if (!user) return;

    const avatarError = validateCustomerAvatar(avatarValue);

    if (avatarError) {
      showToast("error", avatarError);
      return;
    }

    if (!avatarValue) {
      showToast("error", "Vui lòng chọn hoặc nhập avatar");
      return;
    }

    try {
      let avatarFile: File;

      if (avatarValue instanceof File) {
        avatarFile = avatarValue;
      } else {
        const res = await fetch(avatarValue);
        const blob = await res.blob();

        avatarFile = new File([blob], "avatar.jpg", {
          type: blob.type,
        });
      }

      await updateUserAvatarApi(user.id, avatarFile);

      showToast("success", "Cập nhật avatar thành công");

      setTimeout(() => {
        closeEdit();
        setViewUser(null);
        onReload();
      }, 1200);
    } catch {
      showToast("error", "Cập nhật avatar thất bại");
    }
  };

  const openViewById = (users: User[], id: number) => {
    const user = users.find((u) => u.id === id) ?? null;
    setViewUser(user);
  };

  const openEditById = (users: User[], id: number) => {
    const user = users.find((u) => u.id === id);
    if (user) openEdit(user);
  };

  const openConfirmBan = (id: number) => {
    setDeleteId(id);
  };

  const confirmBan = async () => {
    if (!deleteId) return;

    try {
      await changeUserStatusApi(deleteId, "banned");

      showToast("success", "Đã khóa tài khoản");

      setDeleteId(null);

      onReload();
    } catch {
      showToast("error", "Khoá thất bại");
    }
  };

  return {
    toast,
    deleteId,
    setDeleteId,
    openConfirmBan,
    confirmBan,

    viewUser,
    setViewUser,
    openViewById,

    editUser,
    editForm,
    setEditForm,
    openEdit,
    openEditById,
    closeEdit,

    avatarValue,
    setAvatarValue,

    handleSaveInfo,
    handleSaveAvatar,

    getFieldError: formValidator.getFieldError,
    markTouched: formValidator.markTouched,
  };
}