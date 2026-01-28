type Option = {
  label: string;
  value: string;
};

type SelectInputProps = {
  label: string;
  value: string;
  disabled?: boolean;
  options: Option[];
  onChange: (value: string) => void;
};

export default function SelectInput({
  label,
  value,
  disabled,
  options,
  onChange,
}: SelectInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select
        value={value}
        disabled={disabled}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full px-4 py-2 border rounded-lg outline-none bg-white
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          disabled:bg-gray-100
        "
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
