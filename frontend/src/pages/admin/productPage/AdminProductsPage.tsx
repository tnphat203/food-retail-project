import { useState } from "react";
import type { Product } from "@/types/product";

import AdminPageHeader from "@components/admin/AdminPageHeader";
import AdminTable from "@components/admin/AdminTable";
import AdminFiltersBar from "@components/admin/AdminFiltersBar";
import AdminPagination from "@components/ui/AdminPagination";

import ProductViewModal from "@components/admin/product/ProductViewModal";
import ProductEditModal from "@components/admin/product/ProductEditModal";
import ConfirmDialog from "@components/admin/ConfirmDialog";
import AdminToast from "@components/ui/AdminToast";

import { useAdminProducts } from "./hook/useAdminProducts";
import { useAdminProductStatus } from "./hook/useAdminProductStatus";

import {
  productStatusLabel,
  STATUS_FILTER_OPTIONS,
  LIMIT_OPTIONS,
} from "@/utils/productLabels";

export default function AdminProductsPage() {
  const {
    data,
    setData,
    loading,
    page,
    totalPages,
    total,
    limit,
    goToPage,
    status,
    setStatus,
    setLimit,
    search,
    setSearch,
    categoryTree,
    selectedCategory,
    setSelectedCategory,
    reload,
  } = useAdminProducts();

  const [viewProduct, setViewProduct] = useState<Product | null>(null);
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [createOpen, setCreateOpen] = useState(false);

  const { confirmDialog, setConfirmDialog, toast, toggleProductStatus } =
    useAdminProductStatus(data, setData, viewProduct, setViewProduct);

  const columns = [
    {
      header: "ID",
      render: (p: Product) => (
        <span className="text-gray-500 text-sm">PRO-{p.id}</span>
      ),
    },
    {
      header: "Sản phẩm",
      render: (p: Product) => <div className="font-medium">{p.name}</div>,
    },
    {
      header: "Danh mục",
      render: (p: Product) => <span>{p.category?.name ?? "-"}</span>,
    },
    {
      header: "Số biến thể",
      render: (p: Product) => <span>{p.variants?.length ?? 0}</span>,
    },
    {
      header: "Trạng thái",
      render: (p: Product) => {
        const isActive = p.status === "active";
        return (
          <span
            className={`px-2.5 py-1 rounded-full text-xs font-medium border ${
              isActive
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-gray-100 text-gray-600 border-gray-200"
            }`}
          >
            {productStatusLabel(p.status)}
          </span>
        );
      },
    },
    {
      header: "Đánh giá",
      render: (p: Product) => (
        <span className="text-xs text-gray-500 font-medium">
          {(p.ratingAverage ?? 0).toFixed(1)} ⭐
        </span>
      ),
    },
    {
      header: "Thao tác",
      render: (p: Product) => (
        <div className="flex gap-2">
          <button
            onClick={() => setViewProduct(p)}
            className="px-3 py-1 text-xs rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Xem
          </button>
          <button
            onClick={() => setEditProduct(p)}
            className="px-3 py-1 text-xs rounded-md border border-gray-200 hover:bg-gray-50"
          >
            Sửa
          </button>
          <button
            onClick={() => setConfirmDialog({ open: true, productId: p.id })}
            className="px-3 py-1 text-xs rounded-md border border-red-200 text-red-600 hover:bg-red-50"
          >
            {p.status === "active" ? "Khoá" : "Mở khoá"}
          </button>
        </div>
      ),
    },
  ];

  const selects = [
    {
      label: "Trạng thái",
      value: status,
      onChange: (v: string) => setStatus(v as "all" | "active" | "inactive"),
      options: STATUS_FILTER_OPTIONS,
    },
    {
      label: "Nhóm sản phẩm",
      value: selectedCategory,
      onChange: setSelectedCategory,
      options: [
        { value: "all", label: "Tất cả" },
        ...categoryTree.map((c) => ({ value: String(c.id), label: c.name })),
      ],
    },
    {
      label: "Hiển thị",
      value: limit.toString(),
      onChange: (v: string) => setLimit(Number(v)),
      options: LIMIT_OPTIONS,
    },
  ];

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Danh sách sản phẩm"
        description="Quản lý sản phẩm"
        right={
          <button
            onClick={() => setCreateOpen(true)}
            className="px-4 py-2 text-sm font-medium bg-black text-white rounded-md hover:opacity-90"
          >
            + Tạo sản phẩm
          </button>
        }
      />

      <AdminFiltersBar
        search={search}
        onSearchChange={setSearch}
        selects={selects}
      />

      <AdminTable<Product>
        data={data}
        columns={columns}
        emptyMessage={loading ? "Đang tải..." : "Không có sản phẩm"}
      />

      <AdminPagination
        page={page}
        totalPages={totalPages}
        total={total}
        limit={limit}
        onPageChange={goToPage}
      />

      <ProductViewModal
        open={!!viewProduct}
        product={viewProduct}
        onClose={() => setViewProduct(null)}
        onEdit={(p) => setEditProduct(p)}
        categories={categoryTree}
      />

      <ProductEditModal
        open={!!editProduct}
        product={editProduct}
        onClose={() => setEditProduct(null)}
        onUpdated={() => {
          setEditProduct(null);
          reload();
        }}
        categoryOptions={categoryTree.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />

      <ProductEditModal
        open={createOpen}
        product={null}
        onClose={() => setCreateOpen(false)}
        onUpdated={() => {
          setCreateOpen(false);
          reload();
        }}
        categoryOptions={categoryTree.map((c) => ({
          value: c.id,
          label: c.name,
        }))}
      />

      <ConfirmDialog
        open={confirmDialog.open}
        title="Xác nhận thay đổi trạng thái"
        description="Bạn có chắc chắn muốn thay đổi trạng thái sản phẩm này?"
        danger={true}
        onConfirm={() => {
          const product = data.find((p) => p.id === confirmDialog.productId);
          if (product) toggleProductStatus(product);
        }}
        onClose={() => setConfirmDialog({ open: false })}
      />

      <AdminToast
        open={toast.open}
        message={toast.message}
        type={toast.type ?? "success"}
      />
    </div>
  );
}
