"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BookOpen, ClipboardCheck, GraduationCap, Home, LogOut, Receipt, Settings, Users } from "lucide-react";
import { clsx } from "clsx";
import { useAuth } from "@/context/auth-context";
import { useSidebar } from "@/context/sidebar-context";

const items = [
  { href: "/dashboard", label: "Dashboard", icon: Home },
  { href: "/students", label: "Students", icon: GraduationCap },
  { href: "/teachers", label: "Teachers", icon: Users },
  { href: "/parents", label: "Parents", icon: Users },
  { href: "/attendance", label: "Attendance", icon: ClipboardCheck },
  { href: "/exams", label: "Exams", icon: BookOpen },
  { href: "/fees", label: "Fees", icon: Receipt },
  { href: "/settings", label: "Settings", icon: Settings }
];

export function Sidebar() {
  const pathname = usePathname();
  const { logout, user } = useAuth();
  const { isOpen, isMobile, closeSidebar } = useSidebar();

  return (
    <aside
      id="main-navigation-sidebar"
      className={clsx(
        "side fixed left-0 top-0 z-40 flex h-screen w-64 flex-col text-[#cfd6e6] transition-transform duration-300",
        isMobile
          ? (isOpen ? "translate-x-0" : "-translate-x-full")
          : "translate-x-0"
      )}
    >
      {/* Cloud decoration */}
      <div className="cloud sc1" />

      {/* Logo Lockup */}
      <Link href="/dashboard" className="logo">
        <div className="mark">
          <svg viewBox="0 0 100 100" width="30" height="30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="35" cy="55" r="22" fill="#2e5a75" />
            <circle cx="65" cy="55" r="18" fill="#f6b41e" />
            <circle cx="30" cy="48" r="4" fill="#fff" />
            <circle cx="62" cy="50" r="3" fill="#fff" />
            <polygon points="18,55 8,52 18,60" fill="#f6b41e" />
            <polygon points="78,55 86,53 78,60" fill="#2e5a75" />
          </svg>
        </div>
        <div>
          KINDERVALE
          <small>PRESCHOOL</small>
        </div>
      </Link>

      <div className="perm-badge">
        ROLE: <b>{user?.role.toUpperCase()}</b>
      </div>

      <nav className="menu">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={isMobile ? closeSidebar : undefined}
              className={clsx(isActive && "active")}
            >
              <Icon className="ic" size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="side-foot">
        <button onClick={logout} className="btn btn-outline btn-sm w-full justify-center text-xs">
          <LogOut size={14} />
          Logout
        </button>
      </div>
    </aside>
  );
}
