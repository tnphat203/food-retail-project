export default function AdminProductsPage() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">Products</h2>
          <p className="text-sm text-gray-500">Quản lý sản phẩm snack</p>
        </div>

        <button className="px-4 py-2 rounded-lg bg-orange-500 text-white text-sm hover:bg-orange-600 transition">
          + Add Product
        </button>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-4">
        <div className="flex gap-3 mb-4">
          <input
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-orange-200"
            placeholder="Search product..."
          />
          <select className="border border-gray-200 rounded-lg px-3 py-2 text-sm">
            <option>All</option>
            <option>Active</option>
            <option>Hidden</option>
          </select>
        </div>

        <div className="text-sm text-gray-600">
          (Demo) Table sản phẩm sẽ hiển thị ở đây...
        </div>
      </div>
    </div>
  );
}
