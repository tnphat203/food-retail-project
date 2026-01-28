type TextInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  onChange: (value: string) => void;
};

export default function TextInput({
  label,
  value,
  placeholder,
  disabled,
  type = "text",
  inputMode,
  onChange,
}: TextInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        disabled={disabled}
        inputMode={inputMode}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full px-4 py-2 border rounded-lg outline-none
          focus:ring-2 focus:ring-orange-400 focus:border-orange-400
          disabled:bg-gray-100
        "
      />
    </div>
  );
}
