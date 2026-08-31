"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useSubjects } from "@/services/subjects";
import type { Subject } from "@/services/subjects";

export default function SubjectsPage() {
  const { data: subjects, isLoading, isError, error } = useSubjects();

  return (
    <ProtectedShell title="Subjects">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!subjects || subjects.length === 0) && (
        <EmptyState label="No subjects found." />
      )}
      {subjects && subjects.length > 0 && (
        <DataTable<Subject>
          data={subjects}
          columns={[
            { key: "name", label: "Subject Name" },
            { key: "teacherName", label: "Assigned Teacher" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
