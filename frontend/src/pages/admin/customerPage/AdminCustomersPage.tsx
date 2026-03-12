import { useCallback, useMemo } from "react";
import type { User as Customer } from "@/types/user";

import AdminPageHeader from "@components/admin/AdminPageHeader";
import AdminFiltersBar from "@components/admin/AdminFiltersBar";
import AdminTable from "@components/admin/AdminTable";
import ConfirmDialog from "@components/admin/ConfirmDialog";
import AdminPagination from "@components/ui/AdminPagination";

import CustomerViewModal from "@components/admin/users/CustomerViewModal";
import CustomerEditModal from "@components/admin/users/CustomerEditModal";

import { useAdminCustomers } from "@pages/admin/customerPage/hooks/useAdminCustomers";
import { useCustomersAdminModals } from "@pages/admin/customerPage/hooks/useCustomersAdminModals";

import AdminToast from "@/components/ui/AdminToast";

import {
  genderLabel,
  statusLabel,
  GENDER_FILTER_OPTIONS,
  STATUS_FILTER_OPTIONS,
} from "@/utils/userLabels";

type GenderFilter = "all" | NonNullable<Customer["gender"]>;
type StatusFilter = "all" | NonNullable<Customer["status"]>;
type LimitFilter = "10" | "20" | "50";

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
    handleSaveInfo,
    handleSaveAvatar,
    getFieldError,
    markTouched,
  } = modals;

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
                <div className="font-medium text-gray-900">{name}</div>
                <div className="text-xs text-gray-500">ID: {c.id}</div>
              </div>
            </div>
          );
        },
      },
      {
        header: "Email",
        render: (c: Customer) => (
          <span className="text-gray-700 truncate max-w-[220px] block">
            {c.email}
          </span>
        ),
      },
      {
        header: "SĐT",
        render: (c: Customer) => (
          <span className="font-mono text-gray-700">{c.phone ?? "-"}</span>
        ),
      },
      {
        header: "Giới tính",
        render: (c: Customer) => (
          <span className="px-2 py-1 text-xs rounded-md bg-gray-100 text-gray-700">
            {genderLabel(c.gender)}
          </span>
        ),
      },
      {
        header: "Trạng thái",
        render: (c: Customer) => {
          const map = {
            active: "bg-green-50 text-green-700 border-green-200",
            inactive: "bg-yellow-50 text-yellow-700 border-yellow-200",
            banned: "bg-red-50 text-red-700 border-red-200",
          };

          const status = c.status ?? "inactive";

          return (
            <span
              className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
                map[status as keyof typeof map]
              }`}
            >
              {statusLabel(c.status)}
            </span>
          );
        },
      },
      {
        header: "Thao tác",
        render: (c: Customer) => (
          <div className="flex gap-2">
            <button
              onClick={() => openViewById(users, c.id)}
              className="px-3 py-1 text-xs rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Xem
            </button>

            <button
              onClick={() => openEditById(users, c.id)}
              className="px-3 py-1 text-xs rounded-md border border-gray-200 hover:bg-gray-50"
            >
              Sửa
            </button>

            <button
              onClick={() => openConfirmBan(c.id)}
              className="px-3 py-1 text-xs rounded-md border border-red-200 text-red-600 hover:bg-red-50"
            >
              Khoá
            </button>
          </div>
        ),
      },
    ],
    [users, openViewById, openEditById, openConfirmBan],
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
            options: GENDER_FILTER_OPTIONS,
          },
          {
            label: "Trạng thái",
            value: status,
            onChange: (v) => setStatus(v as StatusFilter),
            options: STATUS_FILTER_OPTIONS,
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
        avatarValue={modals.avatarValue}
        setAvatarValue={modals.setAvatarValue}
        onSaveAvatar={handleSaveAvatar}
      />

      <CustomerEditModal
        open={!!editUser && !!editForm}
        customer={editUser}
        form={editForm}
        setForm={setEditForm}
        onClose={closeEdit}
        onSaveInfo={handleSaveInfo}
        getFieldError={getFieldError}
        markTouched={markTouched}
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

      <AdminToast
        open={modals.toast.open}
        message={modals.toast.message}
        type={modals.toast.type}
      />
    </div>
  );
}
