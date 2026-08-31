"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { Card } from "@/components/ui/card";
import { useDashboard } from "@/services/dashboard";
import { useAuth } from "@/context/auth-context";
import { GraduationCap, Users, ClipboardCheck, Receipt } from "lucide-react";

function StatCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string; size?: number }>;
  color: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-4">
        <div className={`rounded-xl p-3 ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-extrabold text-brand-navy">{value}</p>
        </div>
      </div>
    </Card>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();
  const { data, isLoading } = useDashboard();

  const stats = data?.stats;

  return (
    <ProtectedShell title={`Welcome back, ${user?.name ?? "Admin"}`}>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Students"
          value={isLoading ? "—" : stats?.students ?? 0}
          icon={GraduationCap}
          color="bg-blue-500"
        />
        <StatCard
          title="Total Teachers"
          value={isLoading ? "—" : stats?.teachers ?? 0}
          icon={Users}
          color="bg-emerald-500"
        />
        <StatCard
          title="Attendance Rate"
          value={isLoading ? "—" : `${stats?.attendanceRate ?? 0}%`}
          icon={ClipboardCheck}
          color="bg-amber-500"
        />
        <StatCard
          title="Pending Fees"
          value={isLoading ? "—" : stats?.pendingFees ?? 0}
          icon={Receipt}
          color="bg-rose-500"
        />
      </div>

      {data?.notifications && data.notifications.length > 0 && (
        <div className="mt-8">
          <h2 className="mb-4 text-lg font-bold text-brand-navy">Recent Notifications</h2>
          <div className="space-y-3">
            {data.notifications.slice(0, 5).map((n) => (
              <Card key={n.id} className="p-4">
                <h3 className="font-bold text-brand-navy">{n.title}</h3>
                <p className="mt-1 text-sm text-slate-600">{n.body}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </ProtectedShell>
  );
}
