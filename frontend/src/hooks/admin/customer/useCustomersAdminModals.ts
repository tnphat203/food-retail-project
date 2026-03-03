import { useState } from "react";
import type { User } from "../../../types/user";
import type { EditForm } from "../../../components/admin/users/hooks/customerEditValidator";
import {
  updateUserApi,
  changeUserStatusApi,
} from "../../../services/users.api";
import { uploadImageApi } from "../../../services/upload.api";

type ToastType = "success" | "error";

export function useCustomersAdminModals(opts: { onReload: () => void }) {
  const { onReload } = opts;

  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [viewUser, setViewUser] = useState<User | null>(null);
  const [editUser, setEditUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<EditForm | null>(null);

  const showToast = (type: ToastType, msg: string) =>
    console.log(`[${type}]`, msg);

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
      avatar: u.avatar ?? "",
    });
  };

  const closeEdit = () => {
    setEditUser(null);
    setEditForm(null);
  };

  const handleSaveEdit = async () => {
    if (!editUser || !editForm) return;

    try {
      let avatarUrl = editForm.avatar;

      if (editForm.avatar instanceof File) {
        const res = await uploadImageApi(editForm.avatar);
        avatarUrl = res.imageUrl;
      }

      const payload = {
        firstName: editForm.firstName,
        lastName: editForm.lastName,
        email: editForm.email,
        phone: editForm.phone,
        gender: editForm.gender,
        status: editForm.status,
        dateOfBirth: editForm.dateOfBirth,
        avatar: avatarUrl as string,
      };

      await updateUserApi(editUser.id, payload);

      closeEdit();
      showToast("success", "Cập nhật thành công");
      onReload();
    } catch (e) {
      console.error("updateUser failed", e);
      showToast("error", "Cập nhật thất bại");
    }
  };

  const openViewById = (users: User[], id: number) =>
    setViewUser(users.find((u) => u.id === id) ?? null);

  const openEditById = (users: User[], id: number) => {
    const u = users.find((x) => x.id === id);
    if (u) openEdit(u);
  };

  const openConfirmBan = (id: number) => setDeleteId(id);

  const confirmBan = async () => {
    if (!deleteId) return;
    try {
      await changeUserStatusApi(deleteId, "banned");
      showToast("success", "Đã khóa tài khoản");
      setDeleteId(null);
      onReload();
    } catch (e) {
      console.error("ban failed", e);
      showToast("error", "Khoá thất bại");
    }
  };

  return {
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
    handleSaveEdit,
  };
}