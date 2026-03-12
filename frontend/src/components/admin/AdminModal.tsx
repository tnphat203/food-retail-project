import React from "react";

type AdminModalProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function AdminModal({
  open,
  title,
  onClose,
  children,
  footer,
}: AdminModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="w-full max-w-[680px] bg-white rounded-2xl border border-gray-200 shadow-xl overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-200 flex items-center justify-between">
            <div className="font-semibold text-gray-900">{title}</div>
            <button
              onClick={onClose}
              className="px-3 py-1.5 rounded-lg border text-sm hover:bg-gray-50"
            >
              Đóng
            </button>
          </div>

          <div className="p-5">{children}</div>

          {footer && (
            <div className="px-5 py-4 border-t border-gray-200 bg-gray-50">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
