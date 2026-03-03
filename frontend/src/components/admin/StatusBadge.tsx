type Variant = "success" | "warning" | "neutral" | "danger";

const mapVariantClass: Record<Variant, string> = {
  success: "bg-green-50 text-green-700 border-green-200",
  warning: "bg-yellow-50 text-yellow-700 border-yellow-200",
  neutral: "bg-gray-50 text-gray-700 border-gray-200",
  danger: "bg-red-50 text-red-700 border-red-200",
};

export default function StatusBadge({
  text,
  variant = "neutral",
}: {
  text: string;
  variant?: Variant;
}) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-1 rounded-full border text-xs font-medium ${mapVariantClass[variant]}`}
    >
      {text}
    </span>
  );
}
