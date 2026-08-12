"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useHomework } from "@/services/homework";
import { prettyDate } from "@/utils/format";

export default function HomeworkPage() {
  const { data: homework = [], isLoading, error } = useHomework();

  return (
    <ProtectedShell title="Homework">
      {isLoading ? <LoadingState label="Loading homework..." /> : error ? <ErrorState error={error} /> : homework.length ? (
      <div className="space-y-4">
        {homework.map((item) => (
          <Card key={item.id}>
            <h2 className="text-lg font-black text-brand-navy">{item.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{item.className} - {item.subject} - Due {prettyDate(item.dueDate)}</p>
          </Card>
        ))}
      </div>
      ) : <EmptyState label="No homework found." />}
    </ProtectedShell>
  );
}
