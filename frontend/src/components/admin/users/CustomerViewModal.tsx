import { useMemo, useState } from "react";
import type { User as Customer } from "@/types/user";
import AdminModal from "../AdminModal";
import FieldRow from "../FieldRow";
import StatusBadge from "../StatusBadge";

type Props = {
  open: boolean;
  customer: Customer | null;
  onClose: () => void;
  onEdit: (c: Customer) => void;
  onManageAddress: (c: Customer) => void;
  genderLabel: (gender?: Customer["gender"]) => string;
  statusLabel: (status?: Customer["status"]) => string;
  avatarValue: string | File | undefined;
  setAvatarValue: (v: string | File | undefined) => void;
  onSaveAvatar: () => Promise<void>;
};

export default function CustomerViewModal({
  open,
  customer,
  onClose,
  onEdit,
  onManageAddress,
  genderLabel,
  statusLabel,
  avatarValue,
  setAvatarValue,
  onSaveAvatar,
}: Props) {
  const [avatarUrl, setAvatarUrl] = useState("");

  const formatDateOnly = (s?: string | null) => {
    if (!s) return "-";
    const d = new Date(s);
    if (Number.isNaN(d.getTime())) return s;
    return d.toLocaleDateString("vi-VN");
  };

  const initials = useMemo(() => {
    if (!customer) return "?";
    const f = customer.firstName?.[0] ?? "";
    const l = customer.lastName?.[0] ?? "";
    return (f + l).toUpperCase() || "?";
  }, [customer]);

  const avatarPreview = useMemo(() => {
    if (!avatarValue) return customer?.avatar;
    if (avatarValue instanceof File) {
      return URL.createObjectURL(avatarValue);
    }
    return avatarValue;
  }, [avatarValue, customer]);

  const statusText = statusLabel(customer?.status) || "-";
  const genderText = genderLabel(customer?.gender) || "-";

  const fullName =
    `${customer?.firstName ?? ""} ${customer?.lastName ?? ""}`.trim() || "-";

  return (
    <AdminModal
      open={open}
      title="Chi tiết khách hàng"
      onClose={onClose}
      footer={
        customer ? (
          <div className="flex items-center justify-end gap-2">
            <button
              onClick={() => onManageAddress(customer)}
              className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
            >
              Quản lý địa chỉ
            </button>

            <button
              onClick={() => onEdit(customer)}
              className="px-4 py-2 rounded-xl border text-sm hover:bg-gray-50"
            >
              Chỉnh sửa
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-gray-900 text-white text-sm"
            >
              Đóng
            </button>
          </div>
        ) : null
      }
    >
      {!customer ? (
        <div className="text-center text-sm text-gray-500 py-6">
          Không có dữ liệu khách hàng
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-lg font-semibold text-gray-800">{fullName}</div>

          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="rounded-xl border p-4 space-y-1">
                <FieldRow label="Mã khách hàng" value={String(customer.id)} />

                <FieldRow
                  label="Trạng thái"
                  value={
                    <StatusBadge
                      text={statusText}
                      variant={
                        customer.status === "active" ? "success" : "neutral"
                      }
                    />
                  }
                />

                <FieldRow label="Họ" value={customer.firstName || "-"} />

                <FieldRow label="Tên" value={customer.lastName || "-"} />

                <FieldRow label="Email" value={customer.email || "-"} />

                <FieldRow label="Số điện thoại" value={customer.phone || "-"} />

                <FieldRow label="Giới tính" value={genderText} />

                <FieldRow
                  label="Ngày sinh"
                  value={formatDateOnly(customer.dateOfBirth)}
                />

                <FieldRow
                  label="Ngày tạo"
                  value={formatDateOnly(customer.createdAt)}
                />

                <FieldRow
                  label="Cập nhật lần cuối"
                  value={formatDateOnly(customer.updatedAt)}
                />
              </div>
            </div>

            <div className="flex flex-col items-center gap-4">
              <div className="w-32 h-32 rounded-full border bg-gray-100 overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img
                    src={avatarPreview}
                    alt={fullName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-lg font-semibold text-gray-600">
                    {initials}
                  </span>
                )}
              </div>

              <div className="w-full flex flex-col gap-2">
                <input
                  type="text"
                  placeholder="Dán link ảnh..."
                  value={avatarUrl}
                  onChange={(e) => {
                    setAvatarUrl(e.target.value);
                    setAvatarValue(e.target.value);
                  }}
                  className="border rounded-lg px-3 py-2 text-sm"
                />

                <input
                  id="avatarUpload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) setAvatarValue(file);
                  }}
                />

                <label
                  htmlFor="avatarUpload"
                  className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 border rounded-lg text-sm hover:bg-gray-50 transition"
                >
                  📁 Chọn ảnh từ máy
                </label>

                <button
                  onClick={onSaveAvatar}
                  className="px-3 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
                >
                  Cập nhật avatar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminModal>
  );
}
