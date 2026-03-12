import React from "react";

export default function FieldRow({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-12 gap-3 py-2">
      <div className="col-span-4 text-sm text-gray-500">{label}</div>
      <div className="col-span-8 text-sm font-medium text-gray-900">
        {value}
      </div>
    </div>
  );
}
