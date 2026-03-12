import React from "react";
import EmptyState from "./EmptyState";

type Column<T> = {
  header: string;
  className?: string;
  render: (row: T) => React.ReactNode;
};

type AdminTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  minWidth?: number;
  emptyMessage?: string;
};

export default function AdminTable<T>({
  data,
  columns,
  minWidth = 1100,
  emptyMessage = "Không có dữ liệu.",
}: AdminTableProps<T>) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-200 flex items-center justify-between">
        <p className="text-sm text-gray-600">
          Total:{" "}
          <span className="font-medium text-gray-900">{data.length}</span>
        </p>
      </div>

      <div className="overflow-auto">
        <table className={`min-w-[${minWidth}px] w-full text-sm`}>
          <thead className="bg-gray-50 text-gray-600">
            <tr className="text-left">
              {columns.map((c, idx) => (
                <th
                  key={idx}
                  className={`px-4 py-3 font-medium ${c.className || ""}`}
                >
                  {c.header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-100">
            {data.map((row, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                {columns.map((c, cIdx) => (
                  <td key={cIdx} className={`px-4 py-3 ${c.className || ""}`}>
                    {c.render(row)}
                  </td>
                ))}
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={columns.length}>
                  <EmptyState message={emptyMessage} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
