"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useClasses } from "@/services/classes";
import type { ClassRoom } from "@/services/classes";

export default function ClassroomsPage() {
  const { data: classes, isLoading, isError, error } = useClasses();

  return (
    <ProtectedShell title="Classrooms">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!classes || classes.length === 0) && (
        <EmptyState label="No classrooms found." />
      )}
      {classes && classes.length > 0 && (
        <DataTable<ClassRoom>
          data={classes}
          columns={[
            { key: "name", label: "Class Name" },
            { key: "teacher", label: "Teacher" },
            { key: "capacity", label: "Capacity" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
