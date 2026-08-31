"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useLessonPlans } from "@/services/lesson-plans";

const statusColor: Record<string, string> = {
  DRAFT: "bg-gray-100 text-gray-700",
  PENDING: "bg-yellow-100 text-yellow-700",
  APPROVED: "bg-green-100 text-green-700",
  REJECTED: "bg-red-100 text-red-700",
};

export default function LessonPlansPage() {
  const { data: plans, isLoading, isError, error } = useLessonPlans();

  return (
    <ProtectedShell title="Lesson Plans">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!plans || plans.length === 0) && (
        <EmptyState label="No lesson plans found." />
      )}
      {plans && plans.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {plans.map((plan) => (
            <Card key={plan.id} className="p-4">
              <div className="flex items-start justify-between">
                <h3 className="font-bold text-brand-navy">{plan.title}</h3>
                <Badge className={statusColor[plan.status] ?? ""}>{plan.status}</Badge>
              </div>
              <p className="mt-1 text-sm text-slate-500">{plan.subject} — {plan.className}</p>
              <p className="mt-1 text-xs text-slate-400">{plan.date}</p>
            </Card>
          ))}
        </div>
      )}
    </ProtectedShell>
  );
}
