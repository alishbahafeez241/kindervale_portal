"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLeaveRequests } from "@/services/leave-requests";

const statusTone: Record<string, "ok" | "warn" | "bad" | "neutral"> = {
  PENDING: "warn",
  APPROVED: "ok",
  REJECTED: "bad",
  CANCELLED: "neutral",
};

export default function LeaveRequestsPage() {
  const { data: requests, isLoading, isError, error } = useLeaveRequests();

  return (
    <ProtectedShell title="Leave Requests">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!requests || requests.length === 0) && (
        <EmptyState label="No leave requests found." />
      )}
      {requests && requests.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {requests.map((req) => (
            <Card key={req.id} className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-brand-navy">{req.userName ?? "Staff"}</h3>
                <Badge tone={statusTone[req.status] ?? "neutral"}>{req.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{req.type}</p>
              <p className="text-xs text-slate-400">{req.startDate} → {req.endDate}</p>
              <p className="mt-2 text-sm">{req.reason}</p>
            </Card>
          ))}
        </div>
      )}
    </ProtectedShell>
  );
}
