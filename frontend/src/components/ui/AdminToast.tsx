type Props = {
  open: boolean;
  message: string;
  type?: "success" | "error";
};

export default function AdminToast({ open, message, type = "success" }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none">
      <div
        className={`px-5 py-3 rounded-2xl shadow-lg text-sm font-medium border
        ${
          type === "success"
            ? "bg-white text-green-700 border-green-200"
            : "bg-white text-red-700 border-red-200"
        }`}
      >
        {message}
      </div>
    </div>
  );
}
