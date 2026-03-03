import { useMemo } from "react";
import type { User as Customer } from "../../../types/user";
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
};

export default function CustomerViewModal({
  open,
  customer,
  onClose,
  onEdit,
  onManageAddress,
  genderLabel,
  statusLabel,
}: Props) {
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

  const statusText = statusLabel(customer?.status) || "-";
  const genderText = genderLabel(customer?.gender) || "-";

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
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full border bg-gray-100 overflow-hidden flex items-center justify-center">
              {customer.avatar ? (
                <img
                  src={customer.avatar}
                  alt={`${customer.firstName ?? ""} ${customer.lastName ?? ""}`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-gray-600">
                  {initials}
                </span>
              )}
            </div>

            <div className="min-w-0">
              <div className="text-lg font-semibold truncate">
                {customer.firstName || "-"} {customer.lastName || ""}
              </div>
              <div className="text-sm text-gray-500 truncate">
                {customer.email || "-"}
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-4 space-y-1">
            <FieldRow label="Mã khách hàng" value={String(customer.id)} />

            <FieldRow
              label="Trạng thái"
              value={
                <StatusBadge
                  text={statusText}
                  variant={customer.status === "active" ? "success" : "neutral"}
                />
              }
            />

            <FieldRow label="Giới tính" value={genderText} />
            <FieldRow label="Số điện thoại" value={customer.phone || "-"} />
            <FieldRow
              label="Ngày sinh"
              value={formatDateOnly(customer.dateOfBirth)}
            />

            <FieldRow
              label="Ảnh đại diện"
              value={customer.avatar ? "Có ảnh" : "Chưa có"}
            />

            {customer.createdAt && (
              <FieldRow
                label="Ngày tạo"
                value={formatDateOnly(customer.createdAt)}
              />
            )}
          </div>
        </div>
      )}
    </AdminModal>
  );
}
