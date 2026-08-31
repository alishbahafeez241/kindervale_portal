"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useSubjects } from "@/services/subjects";
import type { Subject } from "@/services/subjects";

export default function SubjectsPage() {
  const { data: subjects, isLoading, isError } = useSubjects();

  return (
    <ProtectedShell title="Subjects">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!subjects || subjects.length === 0) && (
        <EmptyState message="No subjects found." />
      )}
      {subjects && subjects.length > 0 && (
        <DataTable<Subject>
          data={subjects}
          columns={[
            { key: "name", header: "Subject Name" },
            { key: "teacherName", header: "Assigned Teacher" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
