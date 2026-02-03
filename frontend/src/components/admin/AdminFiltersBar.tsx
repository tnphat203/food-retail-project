export type Option<T extends string = string> = {
  label: string;
  value: T;
};

export type AdminFilterSelect<T extends string = string> = {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: Option<T>[];
};

export type AdminFiltersBarProps<T extends string = string> = {
  search: string;
  onSearchChange: (v: string) => void;
  searchPlaceholder?: string;
  selects?: AdminFilterSelect<T>[];
};

export default function AdminFiltersBar<T extends string = string>({
  search,
  onSearchChange,
  searchPlaceholder = "Tìm kiếm...",
  selects = [],
}: AdminFiltersBarProps<T>) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
      <div className="flex-1">
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder={searchPlaceholder}
          className="w-full px-4 py-2.5 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {selects.map((s, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="text-sm text-gray-600">{s.label}:</span>

            <select
              value={s.value}
              onChange={(e) => s.onChange(e.target.value as T)}
              className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-orange-400"
            >
              {s.options.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
