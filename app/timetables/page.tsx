"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useTimetables } from "@/services/timetables";
import type { Timetable } from "@/services/timetables";

export default function TimetablesPage() {
  const { data: timetables, isLoading, isError } = useTimetables();

  return (
    <ProtectedShell title="Timetables">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!timetables || timetables.length === 0) && (
        <EmptyState message="No timetable entries found." />
      )}
      {timetables && timetables.length > 0 && (
        <DataTable<Timetable>
          data={timetables}
          columns={[
            { key: "day", header: "Day" },
            { key: "period", header: "Period" },
            { key: "subject", header: "Subject" },
            { key: "teacher", header: "Teacher" },
            { key: "className", header: "Class" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
