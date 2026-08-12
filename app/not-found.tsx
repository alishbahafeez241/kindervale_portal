"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 bg-slate-50 p-8 text-center">
      <div className="text-7xl font-black text-[#2e5a75]">404</div>
      <h1 className="text-2xl font-bold text-slate-700">Page Not Found</h1>
      <p className="text-slate-500">The page you are looking for does not exist.</p>
      <Link href="/" className="inline-flex items-center gap-2 rounded-full bg-[#f6b41e] px-8 py-3 font-bold text-slate-900 transition hover:bg-[#f5bf20]">
        Back to Dashboard
      </Link>
    </div>
  );
}
