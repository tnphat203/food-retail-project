type PasswordInputProps = {
  label: string;
  value: string;
  placeholder?: string;
  disabled?: boolean;
  showPassword: boolean;
  onToggleShow: () => void;
  onChange: (value: string) => void;
};

export default function PasswordInput({
  label,
  value,
  placeholder,
  disabled,
  showPassword,
  onToggleShow,
  onChange,
}: PasswordInputProps) {
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="
            w-full px-4 py-2 border rounded-lg outline-none pr-12
            focus:ring-2 focus:ring-orange-400 focus:border-orange-400
            disabled:bg-gray-100
          "
        />

        <button
          type="button"
          onClick={onToggleShow}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-gray-500 hover:text-gray-700"
        >
          {showPassword ? "Ẩn" : "Hiện"}
        </button>
      </div>
    </div>
  );
}
