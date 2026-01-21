export default function Logo() {
  return (
    <div className="flex items-center gap-3 select-none">
      <div className="relative w-12 h-12 rounded-2xl bg-gradient-to-br from-orange-400 to-yellow-400 shadow-lg flex items-center justify-center">
        <span className="text-white font-extrabold text-xl tracking-wide">
          GS
        </span>
        <span className="absolute -top-1 -right-1 text-sm">🍿</span>
      </div>

      <div className="leading-tight">
        <div className="text-xl font-extrabold text-gray-800">
          Go<span className="text-orange-500">Snack</span>
        </div>
        <div className="text-xs text-gray-500 tracking-wide">
          Snack • Fast • Fun
        </div>
      </div>
    </div>
  );
}
