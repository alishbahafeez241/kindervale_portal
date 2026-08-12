"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { useExams } from "@/services/exam";
import type { Exam } from "@/types";
import { prettyDate } from "@/utils/format";

export default function ExamsPage() {
  const { data: exams = [], isLoading, error } = useExams();

  return (
    <ProtectedShell title="Exams">
      {isLoading ? <LoadingState label="Loading exams..." /> : error ? <ErrorState error={error} /> : (
      <DataTable<Exam>
        data={exams}
        columns={[
          { key: "title", label: "Title" },
          { key: "subject", label: "Subject" },
          { key: "className", label: "Class" },
          { key: "date", label: "Date", render: (row) => prettyDate(row.date) },
          { key: "maxMarks", label: "Marks" }
        ]}
      />
      )}
    </ProtectedShell>
  );
}
