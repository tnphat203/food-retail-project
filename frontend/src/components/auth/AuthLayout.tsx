import type { ReactNode } from "react";

interface AuthLayoutProps {
  title: string;
  subtitle: string;
  bannerTitle: string;
  bannerDescription: string;
  children: ReactNode;
}

export default function AuthLayout({
  title,
  subtitle,
  bannerTitle,
  bannerDescription,
  children,
}: AuthLayoutProps) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl overflow-hidden grid grid-cols-1 md:grid-cols-2">
        <div className="hidden md:flex flex-col justify-center items-center bg-gradient-to-br from-orange-400 to-yellow-400 text-white p-10">
          <h2 className="text-2xl font-bold mb-2">{bannerTitle}</h2>
          <p className="text-center text-white/90">{bannerDescription}</p>
        </div>

        <div className="p-8 flex flex-col justify-center">
          <h1 className="text-2xl font-bold text-center mb-2">{title}</h1>
          <p className="text-center text-gray-500 mb-6">{subtitle}</p>

          {children}
        </div>
      </div>
    </div>
  );
}
