export type Option<T extends string = string> = {
  label: string;
  value: T;
};

export type FilterSelect<T extends string = string> = {
  label: string;
  value: T;
  onChange: (v: T) => void;
  options: readonly Option<T>[];
};

export type AdminFiltersBarProps = {
  search: string;
  onSearchChange: (v: string) => void;
  selects: FilterSelect[];
};

export default function AdminFiltersBar({
  search,
  onSearchChange,
  selects,
}: AdminFiltersBarProps) {
  return (
    <div className="bg-white p-4 rounded-xl border shadow-sm flex flex-col gap-4">
      <div className="relative max-w-xs">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          🔍
        </span>
        <input
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Tìm kiếm khách hàng..."
          className="w-full pl-9 pr-3 py-2 text-sm border rounded-lg 
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap gap-4">
        {selects.map((s) => (
          <div key={s.label} className="flex flex-col text-sm min-w-[140px]">
            <label className="text-gray-500 mb-1">{s.label}</label>

            <select
              value={s.value}
              onChange={(e) => s.onChange(e.target.value)}
              className="border rounded-lg px-3 py-2 bg-white text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {s.options.map((o) => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}
