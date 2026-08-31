"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useClasses } from "@/services/classes";
import type { ClassRoom } from "@/services/classes";

export default function ClassroomsPage() {
  const { data: classes, isLoading, isError } = useClasses();

  return (
    <ProtectedShell title="Classrooms">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!classes || classes.length === 0) && (
        <EmptyState message="No classrooms found." />
      )}
      {classes && classes.length > 0 && (
        <DataTable<ClassRoom>
          data={classes}
          columns={[
            { key: "name", header: "Class Name" },
            { key: "teacher", header: "Teacher" },
            { key: "capacity", header: "Capacity" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
