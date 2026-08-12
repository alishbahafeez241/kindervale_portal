"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useParents } from "@/services/parent";
import { useStudents } from "@/services/student";
import type { Parent } from "@/types";

export default function ParentsPage() {
  const studentsQuery = useStudents();
  const parentsQuery = useParents();

  return (
    <ProtectedShell title="Parents">
      {studentsQuery.isLoading || parentsQuery.isLoading ? <LoadingState label="Loading parents..." /> : studentsQuery.error ? <ErrorState error={studentsQuery.error} /> : parentsQuery.error ? <ErrorState error={parentsQuery.error} /> : (
      <DataTable<Parent>
        data={parentsQuery.data ?? []}
        searchLabel="Search parents"
        columns={[
          { key: "name", label: "Name" },
          { key: "email", label: "Email" },
          { key: "phone", label: "Phone" },
          { key: "studentIds", label: "Children", render: (row) => row.studentIds.map((id) => studentsQuery.data?.find((student) => student.id === id)?.name).filter(Boolean).join(", ") || "No linked students" }
        ]}
      />
      )}
    </ProtectedShell>
  );
}
