"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { useLeaveRequests } from "@/services/leave-requests";

const statusColor: Record<string, string> = {
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
  CANCELLED: "bg-gray-100 text-gray-700",
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
                <Badge className={statusColor[req.status] ?? ""}>{req.status}</Badge>
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
