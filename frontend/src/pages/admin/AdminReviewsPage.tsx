import { useMemo, useState } from "react";
import AdminPageHeader from "../../components/admin/AdminPageHeader";
import AdminFiltersBar from "../../components/admin/AdminFiltersBar";
import AdminTable from "../../components/admin/AdminTable";
import StatusBadge from "../../components/admin/StatusBadge";
import ConfirmDialog from "../../components/admin/ConfirmDialog";

type ReviewStatus = "pending" | "approved" | "hidden";

type Review = {
  id: string;
  productName: string;
  userName: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
  status: ReviewStatus;
};

const mockReviews: Review[] = [
  {
    id: "r1",
    productName: "Bánh ChocoPie",
    userName: "Nguyễn Văn A",
    rating: 5,
    comment: "Ngon, đóng gói kỹ, giao nhanh.",
    createdAt: "2026-01-25",
    status: "approved",
  },
  {
    id: "r2",
    productName: "Nước ngọt Pepsi",
    userName: "Trần Thị B",
    rating: 3,
    comment: "Ổn nhưng hơi ít đá :))",
    createdAt: "2026-01-27",
    status: "pending",
  },
  {
    id: "r3",
    productName: "Snack khoai tây",
    userName: "Lê Văn C",
    rating: 1,
    comment: "Giao trễ, sản phẩm móp.",
    createdAt: "2026-01-28",
    status: "hidden",
  },
];

export default function AdminReviewsPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<ReviewStatus | "all">("all");
  const [rating, setRating] = useState<number | "all">("all");

  const [deleteId, setDeleteId] = useState<string | null>(null);

  const data = useMemo(() => {
    const s = search.trim().toLowerCase();

    return mockReviews
      .filter((r) => (status === "all" ? true : r.status === status))
      .filter((r) => (rating === "all" ? true : r.rating === rating))
      .filter((r) => {
        if (!s) return true;
        return (
          r.productName.toLowerCase().includes(s) ||
          r.userName.toLowerCase().includes(s) ||
          r.comment.toLowerCase().includes(s)
        );
      });
  }, [search, status, rating]);

  const statusVariant = (st: ReviewStatus) => {
    if (st === "approved") return "success";
    if (st === "pending") return "warning";
    return "neutral";
  };

  const handleApprove = (id: string) => {
    alert(`TODO: approve review ${id}`);
  };

  const handleHide = (id: string) => {
    alert(`TODO: hide review ${id}`);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  return (
    <div className="space-y-4">
      <AdminPageHeader
        title="Reviews Management"
        description="Duyệt, ẩn hoặc xoá đánh giá của khách hàng."
      />

      <AdminFiltersBar
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search product / user / comment..."
        selects={[
          {
            label: "Status",
            value: status,
            onChange: (v) => setStatus(v as ReviewStatus | "all"),
            options: [
              { label: "All", value: "all" },
              { label: "Pending", value: "pending" },
              { label: "Approved", value: "approved" },
              { label: "Hidden", value: "hidden" },
            ],
          },
          {
            label: "Rating",
            value: String(rating),
            onChange: (v) => setRating(v === "all" ? "all" : Number(v)),
            options: [
              { label: "All", value: "all" },
              { label: "5 ★", value: "5" },
              { label: "4 ★", value: "4" },
              { label: "3 ★", value: "3" },
              { label: "2 ★", value: "2" },
              { label: "1 ★", value: "1" },
            ],
          },
        ]}
      />

      <AdminTable<Review>
        data={data}
        emptyMessage="Không có đánh giá nào."
        columns={[
          {
            header: "Product",
            render: (r) => (
              <span className="font-medium text-gray-900">{r.productName}</span>
            ),
          },
          {
            header: "User",
            render: (r) => <span className="text-gray-700">{r.userName}</span>,
          },
          {
            header: "Rating",
            render: (r) => (
              <span className="text-gray-700">
                <span className="font-medium">{r.rating}</span>{" "}
                <span className="text-gray-500">/ 5</span>
              </span>
            ),
          },
          {
            header: "Comment",
            render: (r) => (
              <p className="text-gray-700 max-w-[520px] line-clamp-2">
                {r.comment}
              </p>
            ),
          },
          {
            header: "Date",
            render: (r) => <span className="text-gray-700">{r.createdAt}</span>,
          },
          {
            header: "Status",
            render: (r) => (
              <StatusBadge
                text={r.status.toUpperCase()}
                variant={statusVariant(r.status)}
              />
            ),
          },
          {
            header: "Actions",
            className: "text-right",
            render: (r) => (
              <div className="flex items-center justify-end gap-2">
                {r.status !== "approved" && (
                  <button
                    onClick={() => handleApprove(r.id)}
                    className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                  >
                    Approve
                  </button>
                )}

                {r.status !== "hidden" && (
                  <button
                    onClick={() => handleHide(r.id)}
                    className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                  >
                    Hide
                  </button>
                )}

                <button
                  onClick={() => handleDelete(r.id)}
                  className="px-3 py-1.5 rounded-lg border text-sm text-red-600 hover:bg-red-50"
                >
                  Delete
                </button>
              </div>
            ),
          },
        ]}
      />

      <ConfirmDialog
        open={!!deleteId}
        title="Xoá đánh giá"
        description="Bạn chắc chắn muốn xoá đánh giá này? Hành động này không thể hoàn tác."
        confirmText="Xoá"
        cancelText="Huỷ"
        danger
        onClose={() => setDeleteId(null)}
        onConfirm={() => {
          alert(`TODO: delete review ${deleteId}`);
        }}
      />
    </div>
  );
}
