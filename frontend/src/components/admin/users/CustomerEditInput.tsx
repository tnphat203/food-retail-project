type Props = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
  type?: string;
  onBlur?: () => void;
};

export default function CustomerEditInput({
  label,
  value,
  onChange,
  error,
  type = "text",
  onBlur,
}: Props) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium">{label}</label>

      <input
        type={type}
        value={value ?? ""}
        onBlur={onBlur}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 border rounded-lg text-sm ${
          error ? "border-red-500" : "border-gray-300"
        }`}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
