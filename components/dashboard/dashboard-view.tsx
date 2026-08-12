"use client";

import { useState } from "react";
import Link from "next/link";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { StudentIdCardModal } from "@/components/students/student-id-card-modal";
import { useAuth } from "@/context/auth-context";
import { useStudents } from "@/services/student";
import { useDashboard } from "@/services/dashboard";
import { LoadingState, ErrorState } from "@/components/state/query-state";
import { prettyDate } from "@/utils/format";
import type { Student } from "@/types";

export function DashboardView() {
  const { user } = useAuth();

  // Single /dashboard call for all stats + notifications
  const dashboardQuery = useDashboard();
  const stats = dashboardQuery.data?.stats;
  const notifications = dashboardQuery.data?.notifications ?? [];

  // useStudents is only needed for the parent role child-switcher UI.
  // For all other roles the counts come from the dashboard endpoint.
  const isParent = user?.role === "parent";
  const studentsQuery = useStudents();
  const students = studentsQuery.data ?? [];

  const parentChildren = isParent
    ? students.filter((s) => user?.linkedStudentIds?.includes(s.id))
    : [];

  const [selectedChildId, setSelectedChildId] = useState<string>(
    parentChildren[0]?.id || ""
  );
  const [selectedStudentForCard, setSelectedStudentForCard] = useState<Student | null>(null);

  const activeChild =
    students.find((s) => s.id === selectedChildId) || parentChildren[0] || undefined;

  return (
    <ProtectedShell title="Dashboard">
      <div className={`space-y-6 ${isParent ? "portal role-parent p-4 rounded-3xl" : ""}`}>
        {/* Legacy Greeting Banner */}
        <div className="greet">
          <h2>Welcome to Kindervale, {user?.name}!</h2>
          <p>School Information System &amp; Early Childhood Learning Portal.</p>
          <div className="bird">🐥</div>
        </div>

        {/* Parent Specific Child Hero Switcher */}
        {isParent && parentChildren.length > 0 && (
          <div className="child-hero">
            <div className="panel">
              <h3 className="font-bold text-[#2e5a75] mb-2">Select Child</h3>
              <div className="flex flex-wrap gap-3">
                {parentChildren.map((child) => (
                  <div
                    key={child.id}
                    onClick={() => setSelectedChildId(child.id)}
                    className={`kv-child ${activeChild?.id === child.id ? "ring-2 ring-[#f6b41e]" : ""}`}
                  >
                    <div className="kv-avatar">{child.name.charAt(0)}</div>
                    <div className="kv-info">
                      <b>{child.name}</b>
                      <small>{child.className} · Attendance: {child.attendance}%</small>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {activeChild && (
              <div className="panel">
                <h3>Student Profile — {activeChild.name}</h3>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-4 text-sm">
                  <div>
                    <span className="text-slate-400 font-bold block text-xs">Admission No</span>
                    <b>{activeChild.id}</b>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-xs">Class</span>
                    <b>{activeChild.className}</b>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-xs">Attendance</span>
                    <b className="text-teal-600">{activeChild.attendance}%</b>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block text-xs">Fee Status</span>
                    <b className={activeChild.feeStatus === "Paid" ? "text-teal-600" : "text-amber-600"}>
                      {activeChild.feeStatus}
                    </b>
                  </div>
                </div>

                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedStudentForCard(activeChild)}
                    className="btn btn-primary btn-sm"
                  >
                    🪪 View &amp; Download Student ID Card PDF
                  </button>
                  <Link href="/calendar" className="btn btn-outline btn-sm">
                    📅 Annual Calendar
                  </Link>
                  <Link href="/homework" className="btn btn-outline btn-sm">
                    📚 Homework
                  </Link>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Dashboard stats — sourced from /dashboard endpoint */}
        {dashboardQuery.isLoading ? (
          <LoadingState label="Loading dashboard..." />
        ) : dashboardQuery.error ? (
          <ErrorState error={dashboardQuery.error} />
        ) : (
          <div className="stat-grid">
            <div className="stat">
              <div className="lbl">Total Students</div>
              <div className="num">{stats?.students ?? 0}</div>
            </div>
            <div className="stat">
              <div className="lbl">Active Staff</div>
              <div className="num">{stats?.teachers ?? 0}</div>
            </div>
            <div className="stat">
              <div className="lbl">Avg Attendance</div>
              <div className="num">{stats?.attendanceRate ?? 0}%</div>
            </div>
            <div className="stat">
              <div className="lbl">Pending Fees (PKR)</div>
              <div className="num">{stats?.pendingFees ?? 0}</div>
            </div>
          </div>
        )}

        {/* Notices & Quick Links Panels */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="panel">
            <h3>📢 School Notices</h3>
            <div className="space-y-3">
              {notifications.length ? (
                notifications.map((n) => (
                  <div key={n.id} className="notice">
                    <b>{n.title}</b>
                    <small>{n.body} ({prettyDate(n.date)})</small>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400">No notices posted.</p>
              )}
            </div>
          </div>

          <div className="panel">
            <h3>⚡ Portal Quick Navigation</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <Link href="/students" className="btn btn-outline justify-center">
                🎓 Students List
              </Link>
              <Link href="/attendance" className="btn btn-outline justify-center">
                📋 Attendance
              </Link>
              <Link href="/fees" className="btn btn-outline justify-center">
                💳 Fees &amp; Invoices
              </Link>
              <Link href="/reports" className="btn btn-outline justify-center">
                📊 Report Cards
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Student ID Card Modal */}
      {selectedStudentForCard && (
        <StudentIdCardModal
          student={selectedStudentForCard}
          isOpen={Boolean(selectedStudentForCard)}
          onClose={() => setSelectedStudentForCard(null)}
        />
      )}
    </ProtectedShell>
  );
}

