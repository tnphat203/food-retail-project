import { useCallback, useMemo } from "react";
import type { User as Customer } from "../../types/user";

import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminFiltersBar from "../../components/admin/AdminFiltersBar";
import AdminTable from "../../components/admin/AdminTable";
import ConfirmDialog from "../../components/admin/ConfirmDialog";
import AdminPagination from "../../components/ui/AdminPagination";

import CustomerViewModal from "../../components/admin/users/CustomerViewModal";
import CustomerEditModal from "../../components/admin/users/CustomerEditModal";

import { useAdminCustomers } from "../../hooks/admin/customer/useAdminCustomers";
import { useCustomersAdminModals } from "../../hooks/admin/customer/useCustomersAdminModals";

type GenderFilter = "all" | NonNullable<Customer["gender"]>;
type StatusFilter = "all" | NonNullable<Customer["status"]>;
type LimitFilter = "10" | "20" | "50";

const GENDER_OPTIONS = [
  { label: "Tất cả", value: "all" },
  { label: "Nam", value: "male" },
  { label: "Nữ", value: "female" },
  { label: "Khác", value: "other" },
] as const satisfies readonly { label: string; value: GenderFilter }[];

const STATUS_OPTIONS = [
  { label: "Tất cả", value: "all" },
  { label: "Đang hoạt động", value: "active" },
  { label: "Tạm ngưng", value: "inactive" },
  { label: "Bị khoá", value: "banned" },
] as const satisfies readonly { label: string; value: StatusFilter }[];

const LIMIT_OPTIONS = [
  { label: "10", value: "10" },
  { label: "20", value: "20" },
  { label: "50", value: "50" },
] as const satisfies readonly { label: string; value: LimitFilter }[];

export default function AdminCustomersPage() {
  const customers = useAdminCustomers();
  const modals = useCustomersAdminModals({ onReload: customers.fetchUsers });

  const {
    data,
    users,
    loading,
    search,
    gender,
    status,
    limit,
    page,
    total,
    totalPages,
    setSearch,
    setGender,
    setStatus,
    setLimit,
    goToPage,
  } = customers;

  const {
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
  } = modals;

  const genderLabel = useCallback((g?: Customer["gender"]) => {
    return g === "male"
      ? "Nam"
      : g === "female"
        ? "Nữ"
        : g === "other"
          ? "Khác"
          : "-";
  }, []);

  const statusLabel = useCallback((s?: Customer["status"]) => {
    return s === "active"
      ? "Đang hoạt động"
      : s === "inactive"
        ? "Tạm ngưng"
        : s === "banned"
          ? "Bị khoá"
          : "-";
  }, []);

  const handleManageAddress = useCallback((c: Customer) => {
    window.location.href = `/admin/customers/${c.id}/addresses`;
  }, []);

  const columns = useMemo(
    () => [
      {
        header: "Khách hàng",
        render: (c: Customer) => {
          const name =
            `${c.firstName ?? ""} ${c.lastName ?? ""}`.trim() || "(No name)";

          return (
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border bg-gray-100 flex items-center justify-center overflow-hidden">
                {c.avatar ? (
                  <img
                    src={c.avatar}
                    alt={name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-xs font-semibold text-gray-600">
                    {(c.firstName?.[0] ?? "").toUpperCase()}
                    {(c.lastName?.[0] ?? "").toUpperCase()}
                  </span>
                )}
              </div>

              <div>
                <div className="font-medium">{name}</div>
                <div className="text-xs text-gray-500">ID: {c.id}</div>
              </div>
            </div>
          );
        },
      },
      { header: "Email", render: (c: Customer) => c.email },
      { header: "SĐT", render: (c: Customer) => c.phone ?? "-" },
      { header: "Giới tính", render: (c: Customer) => genderLabel(c.gender) },
      { header: "Trạng thái", render: (c: Customer) => statusLabel(c.status) },
      {
        header: "Thao tác",
        render: (c: Customer) => (
          <div className="flex gap-2">
            <button onClick={() => openViewById(users, c.id)} className="btn">
              Xem
            </button>
            <button onClick={() => openEditById(users, c.id)} className="btn">
              Sửa
            </button>
            <button onClick={() => openConfirmBan(c.id)} className="btn-danger">
              Khoá
            </button>
          </div>
        ),
      },
    ],
    [
      users,
      genderLabel,
      statusLabel,
      openViewById,
      openEditById,
      openConfirmBan,
    ],
  );

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Danh sách khách hàng"
        description="Quản lý thông tin khách hàng đã đăng ký tài khoản."
      />

      <AdminFiltersBar
        search={search}
        onSearchChange={setSearch}
        selects={[
          {
            label: "Giới tính",
            value: gender,
            onChange: (v) => setGender(v as GenderFilter),
            options: GENDER_OPTIONS,
          },
          {
            label: "Trạng thái",
            value: status,
            onChange: (v) => setStatus(v as StatusFilter),
            options: STATUS_OPTIONS,
          },
          {
            label: "Hiển thị",
            value: limit,
            onChange: (v) => setLimit(v as LimitFilter),
            options: LIMIT_OPTIONS,
          },
        ]}
      />

      <AdminTable<Customer>
        data={data}
        emptyMessage={loading ? "Đang tải dữ liệu..." : "Không có khách hàng"}
        columns={columns}
      />

      <AdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={Number(limit)}
        onPageChange={goToPage}
      />

      <CustomerViewModal
        open={!!viewUser}
        customer={viewUser}
        onClose={() => setViewUser(null)}
        onEdit={openEdit}
        onManageAddress={handleManageAddress}
        genderLabel={genderLabel}
        statusLabel={statusLabel}
      />

      <CustomerEditModal
        open={!!editUser}
        customer={editUser}
        form={editForm}
        setForm={setEditForm}
        onClose={closeEdit}
        onSave={handleSaveEdit}
      />

      <ConfirmDialog
        open={deleteId !== null}
        title="Khoá khách hàng"
        description="Khách hàng sẽ không thể đăng nhập."
        confirmText="Khoá"
        cancelText="Huỷ"
        danger
        onClose={() => setDeleteId(null)}
        onConfirm={confirmBan}
      />
    </div>
  );
}
