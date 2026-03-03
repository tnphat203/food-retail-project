export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold">Dashboard</h2>
        <p className="text-sm text-gray-500">
          Tổng quan tình hình kinh doanh hôm nay
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Orders Today" value="18" />
        <StatCard title="Revenue" value="2,450,000đ" />
        <StatCard title="Products" value="120" />
        <StatCard title="Users" value="56" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <h3 className="font-semibold mb-2">Recent Orders</h3>
        <div className="text-sm text-gray-600">
          (Demo) Danh sách đơn hàng mới sẽ hiển thị ở đây...
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <p className="text-xs text-gray-500">{title}</p>
      <p className="text-lg font-bold mt-1">{value}</p>
    </div>
  );
}
