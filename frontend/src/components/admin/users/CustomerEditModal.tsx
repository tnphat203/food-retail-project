import type { User as Customer } from "../../../types/user";
import AdminModal from "../AdminModal";
import type { EditForm } from "./hooks/customerEditValidator";
import type { Dispatch, SetStateAction } from "react";
import TextInput from "../../ui/TextInput";
import AvatarUpload from "../../ui/AvatarUpload";

type Props = {
  open: boolean;
  customer: Customer | null;
  form: EditForm | null;
  setForm: Dispatch<SetStateAction<EditForm | null>>;
  onClose: () => void;
  onSave: () => Promise<void>;
};

export default function CustomerEditModal({
  open,
  form,
  setForm,
  onClose,
  onSave,
}: Props) {
  const update = <K extends keyof EditForm>(key: K, value: EditForm[K]) => {
    setForm((prev) => (prev ? { ...prev, [key]: value } : prev));
  };

  if (!open || !form) return null;

  return (
    <AdminModal
      open={open}
      title="Chỉnh sửa khách hàng"
      onClose={onClose}
      footer={
        <div className="flex justify-end gap-2 border-t pt-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border text-sm hover:bg-gray-50"
          >
            Hủy
          </button>

          <button
            onClick={onSave}
            className="px-4 py-2 rounded-lg bg-blue-600 text-white text-sm hover:bg-blue-700"
          >
            Lưu thay đổi
          </button>
        </div>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <TextInput
          label="Họ"
          value={form.firstName}
          onChange={(v) => update("firstName", v)}
        />

        <TextInput
          label="Tên"
          value={form.lastName}
          onChange={(v) => update("lastName", v)}
        />

        <TextInput
          label="Email"
          type="email"
          value={form.email}
          onChange={(v) => update("email", v)}
        />

        <TextInput
          label="Số điện thoại"
          value={form.phone}
          onChange={(v) => update("phone", v)}
        />

        <div className="space-y-1">
          <label className="text-sm font-medium">Giới tính</label>
          <select
            value={form.gender}
            onChange={(e) =>
              update("gender", e.target.value as EditForm["gender"])
            }
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="male">Nam</option>
            <option value="female">Nữ</option>
            <option value="other">Khác</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="text-sm font-medium">Trạng thái</label>
          <select
            value={form.status}
            onChange={(e) =>
              update("status", e.target.value as EditForm["status"])
            }
            className="w-full px-3 py-2 border rounded-lg text-sm"
          >
            <option value="active">Hoạt động</option>
            <option value="inactive">Ngưng hoạt động</option>
            <option value="banned">Bị khóa</option>
          </select>
        </div>

        <TextInput
          label="Ngày sinh"
          type="date"
          value={form.dateOfBirth}
          onChange={(v) => update("dateOfBirth", v)}
        />

        <div className="col-span-1 md:col-span-2">
          <AvatarUpload
            value={form.avatar}
            onChange={(value) => update("avatar", value)}
          />
        </div>
      </div>
    </AdminModal>
  );
}
