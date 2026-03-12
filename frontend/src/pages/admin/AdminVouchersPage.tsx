import { useMemo, useState } from "react";

type VoucherStatus = "active" | "inactive" | "expired";

type Voucher = {
  id: string;
  code: string;
  type: "percent" | "fixed";
  value: number;
  minOrderValue: number;
  maxDiscount?: number;
  usageLimit: number;
  usedCount: number;
  startDate: string;
  endDate: string;
  status: VoucherStatus;
};

const mockVouchers: Voucher[] = [
  {
    id: "v1",
    code: "GOSNACK10",
    type: "percent",
    value: 10,
    minOrderValue: 100000,
    maxDiscount: 30000,
    usageLimit: 200,
    usedCount: 35,
    startDate: "2026-01-01",
    endDate: "2026-12-31",
    status: "active",
  },
  {
    id: "v2",
    code: "FREESHIP20K",
    type: "fixed",
    value: 20000,
    minOrderValue: 150000,
    usageLimit: 100,
    usedCount: 88,
    startDate: "2026-01-10",
    endDate: "2026-02-28",
    status: "inactive",
  },
  {
    id: "v3",
    code: "TET2026",
    type: "percent",
    value: 15,
    minOrderValue: 200000,
    maxDiscount: 50000,
    usageLimit: 50,
    usedCount: 50,
    startDate: "2026-01-15",
    endDate: "2026-01-31",
    status: "expired",
  },
];

const formatMoney = (n: number) =>
  n.toLocaleString("vi-VN", { style: "currency", currency: "VND" });

export default function AdminVouchersPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState<VoucherStatus | "all">("all");

  const data = useMemo(() => {
    const s = search.trim().toLowerCase();

    return mockVouchers
      .filter((v) => (status === "all" ? true : v.status === status))
      .filter((v) => {
        if (!s) return true;
        return v.code.toLowerCase().includes(s);
      });
  }, [search, status]);

  const badgeClass = (st: VoucherStatus) => {
    if (st === "active") return "bg-green-50 text-green-700 border-green-200";
    if (st === "inactive") return "bg-gray-50 text-gray-700 border-gray-200";
    return "bg-red-50 text-red-700 border-red-200";
  };

  const handleCreate = () => {
    alert("TODO: mở modal tạo voucher");
  };

  const handleEdit = (id: string) => {
    alert(`TODO: edit voucher ${id}`);
  };

  const handleToggleStatus = (id: string) => {
    alert(`TODO: bật/tắt voucher ${id}`);
  };

  const handleDelete = (id: string) => {
    const ok = confirm("Bạn chắc chắn muốn xoá voucher này?");
    if (!ok) return;
    alert(`TODO: delete voucher ${id}`);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            Voucher Management
          </h2>
          <p className="text-sm text-gray-500">
            Quản lý mã giảm giá, điều kiện và trạng thái voucher.
          </p>
        </div>

        <button
          onClick={handleCreate}
          className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition"
        >
          + Create Voucher
        </button>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
        <div className="flex-1">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by code (VD: GOSNACK10)..."
            className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Status:</span>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as VoucherStatus | "all")}
            className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="expired">Expired</option>
          </select>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
        <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
          <p className="text-sm text-gray-600">
            Total:{" "}
            <span className="font-medium text-gray-900">{data.length}</span>
          </p>
        </div>

        <div className="overflow-auto">
          <table className="min-w-[1000px] w-full text-sm">
            <thead className="bg-gray-50 text-gray-600">
              <tr className="text-left">
                <th className="px-4 py-3 font-medium">Code</th>
                <th className="px-4 py-3 font-medium">Discount</th>
                <th className="px-4 py-3 font-medium">Min Order</th>
                <th className="px-4 py-3 font-medium">Usage</th>
                <th className="px-4 py-3 font-medium">Date</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {data.map((v) => (
                <tr key={v.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-medium text-gray-900">
                    {v.code}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {v.type === "percent" ? (
                      <div>
                        <div className="font-medium">{v.value}%</div>
                        {v.maxDiscount ? (
                          <div className="text-xs text-gray-500">
                            Max: {formatMoney(v.maxDiscount)}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <div className="font-medium">{formatMoney(v.value)}</div>
                    )}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    {formatMoney(v.minOrderValue)}
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    <div className="font-medium">
                      {v.usedCount}/{v.usageLimit}
                    </div>
                    <div className="text-xs text-gray-500">
                      Remaining: {Math.max(0, v.usageLimit - v.usedCount)}
                    </div>
                  </td>

                  <td className="px-4 py-3 text-gray-700">
                    <div className="text-xs text-gray-500">Start</div>
                    <div className="font-medium">{v.startDate}</div>
                    <div className="text-xs text-gray-500 mt-1">End</div>
                    <div className="font-medium">{v.endDate}</div>
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${badgeClass(
                        v.status,
                      )}`}
                    >
                      {v.status.toUpperCase()}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleEdit(v.id)}
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleToggleStatus(v.id)}
                        className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
                      >
                        Toggle
                      </button>

                      <button
                        onClick={() => handleDelete(v.id)}
                        className="px-3 py-1.5 rounded-lg border text-sm text-red-600 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {data.length === 0 && (
                <tr>
                  <td
                    className="px-4 py-8 text-center text-gray-500"
                    colSpan={7}
                  >
                    Không có voucher nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
