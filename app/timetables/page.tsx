"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useTimetables } from "@/services/timetables";
import type { Timetable } from "@/services/timetables";

export default function TimetablesPage() {
  const { data: timetables, isLoading, isError, error } = useTimetables();

  return (
    <ProtectedShell title="Timetables">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!timetables || timetables.length === 0) && (
        <EmptyState label="No timetable entries found." />
      )}
      {timetables && timetables.length > 0 && (
        <DataTable<Timetable>
          data={timetables}
          columns={[
            { key: "day", label: "Day" },
            { key: "period", label: "Period" },
            { key: "subject", label: "Subject" },
            { key: "teacher", label: "Teacher" },
            { key: "className", label: "Class" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
