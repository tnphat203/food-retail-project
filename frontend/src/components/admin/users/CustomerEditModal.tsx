import type { User as Customer } from "@/types/user";
import AdminModal from "@components/admin/AdminModal";

import type { EditInfoForm } from "./hooks/customerEditValidator";
import type { Dispatch, SetStateAction } from "react";
import CustomerEditInput from "./CustomerEditInput";

type Props = {
  open: boolean;
  customer: Customer | null;

  form: EditInfoForm | null;
  setForm: Dispatch<SetStateAction<EditInfoForm | null>>;

  onClose: () => void;
  onSaveInfo: () => Promise<void>;

  getFieldError: (field: keyof EditInfoForm) => string | undefined;
  markTouched: (field: keyof EditInfoForm) => void;
};

export default function CustomerEditModal({
  open,
  form,
  setForm,
  onClose,
  onSaveInfo,
  getFieldError,
  markTouched,
}: Props) {
  const update = <K extends keyof EditInfoForm>(
    key: K,
    value: EditInfoForm[K],
  ) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (!open || !form) return null;

  return (
    <AdminModal
      open={open}
      title="Chỉnh sửa thông tin khách hàng"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            Huỷ
          </button>

          <button
            onClick={onSaveInfo}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <CustomerEditInput
          label="Họ"
          value={form.firstName}
          error={getFieldError("firstName")}
          onBlur={() => markTouched("firstName")}
          onChange={(v) => update("firstName", v)}
        />

        <CustomerEditInput
          label="Tên"
          value={form.lastName}
          error={getFieldError("lastName")}
          onBlur={() => markTouched("lastName")}
          onChange={(v) => update("lastName", v)}
        />

        <CustomerEditInput
          label="Email"
          type="email"
          value={form.email}
          error={getFieldError("email")}
          onBlur={() => markTouched("email")}
          onChange={(v) => update("email", v)}
        />

        <CustomerEditInput
          label="Số điện thoại"
          value={form.phone}
          error={getFieldError("phone")}
          onBlur={() => markTouched("phone")}
          onChange={(v) => update("phone", v)}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium">Giới tính</label>

          <select
            value={form.gender}
            onBlur={() => markTouched("gender")}
            onChange={(e) =>
              update("gender", e.target.value as EditInfoForm["gender"])
            }
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>

          {getFieldError("gender") && (
            <p className="text-xs text-red-500">{getFieldError("gender")}</p>
          )}
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Trạng thái</label>

          <select
            value={form.status}
            onBlur={() => markTouched("status")}
            onChange={(e) =>
              update("status", e.target.value as EditInfoForm["status"])
            }
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Tạm ngưng</option>
            <option value="banned">Bị khóa</option>
          </select>

          {getFieldError("status") && (
            <p className="text-xs text-red-500">{getFieldError("status")}</p>
          )}
        </div>

        <CustomerEditInput
          label="Ngày sinh"
          type="date"
          value={form.dateOfBirth}
          error={getFieldError("dateOfBirth")}
          onBlur={() => markTouched("dateOfBirth")}
          onChange={(v) => update("dateOfBirth", v)}
        />
      </div>
    </AdminModal>
  );
}
