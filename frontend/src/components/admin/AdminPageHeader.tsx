import React from "react";

type AdminPageHeaderProps = {
  title: string;
  description?: string;
  right?: React.ReactNode;
};

export default function AdminPageHeader({
  title,
  description,
  right,
}: AdminPageHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-3">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
        {description && (
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        )}
      </div>

      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}
