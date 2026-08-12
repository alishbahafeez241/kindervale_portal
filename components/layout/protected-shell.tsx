"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { clsx } from "clsx";
import { Sidebar } from "@/components/layout/sidebar";
import { useAuth } from "@/context/auth-context";
import { useSidebar } from "@/context/sidebar-context";
import { initials } from "@/utils/format";

export function ProtectedShell({ title, children }: { title: string; children: React.ReactNode }) {
  const { isAuthenticated, user, authInitialized } = useAuth();
  const { isOpen, isMobile, toggleSidebar, closeSidebar } = useSidebar();
  const router = useRouter();

  useEffect(() => {
    if (authInitialized && !isAuthenticated) {
      router.push("/login");
    }
  }, [authInitialized, isAuthenticated, router, user]);

  if (!authInitialized) return null;

  if (!isAuthenticated || !user) return null;

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[16rem_1fr]">
      <Sidebar />
      {isOpen && isMobile && <button type="button" aria-label="Close navigation menu" className="fixed inset-0 z-30 bg-slate-950/45 lg:hidden" onClick={closeSidebar} />}
      <main className="min-w-0 p-5 lg:ml-64 lg:p-8">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="main-navigation-sidebar"
              onClick={() => {
  if (isMobile) {
    toggleSidebar();
  }
}}
              className={clsx(
                "inline-flex h-11 w-11 flex-col justify-center gap-[5px] rounded-xl border border-[#dfe8ef] bg-white px-2.5 shadow-soft transition focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2",
                isOpen && "hamburger-active"
              )}
            >
              <span className="block h-[3px] rounded-sm bg-brand-navy transition" />
              <span className="block h-[3px] rounded-sm bg-brand-navy transition" />
              <span className="block h-[3px] rounded-sm bg-brand-navy transition" />
            </button>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-slate-500">School Information System</p>
              <h1 className="text-2xl font-black text-brand-navy">{title}</h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="grid size-11 place-items-center rounded-full bg-brand-gold font-black text-brand-navy">{initials(user.name)}</div>
            <div>
              <div className="font-bold text-brand-navy">{user.name}</div>
              <div className="text-xs font-bold uppercase text-slate-500">{user.role}</div>
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
