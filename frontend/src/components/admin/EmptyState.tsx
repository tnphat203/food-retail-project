export default function EmptyState({
  message = "Không có dữ liệu.",
}: {
  message?: string;
}) {
  return (
    <div className="px-4 py-10 text-center text-gray-500 text-sm">
      {message}
    </div>
  );
}
