"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNotifications } from "@/services/notification";

export default function NotificationsPage() {
  const { data: notifications, isLoading, isError } = useNotifications();

  return (
    <ProtectedShell title="Notifications">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!notifications || notifications.length === 0) && (
        <EmptyState message="No notifications." />
      )}
      {notifications && notifications.length > 0 && (
        <div className="space-y-3">
          {notifications.map((n) => (
            <Card key={n.id} className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-brand-navy">{n.title}</h3>
                <Badge>{n.audience}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-600">{n.body}</p>
              <p className="mt-1 text-xs text-slate-400">{n.date}</p>
            </Card>
          ))}
        </div>
      )}
    </ProtectedShell>
  );
}
