"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useReportCards } from "@/services/report-card";
import { useStudents } from "@/services/student";

export default function ReportsPage() {
  const reportsQuery = useReportCards();
  const studentsQuery = useStudents();
  const reports = reportsQuery.data ?? [];

  return (
    <ProtectedShell title="Reports">
      {reportsQuery.isLoading || studentsQuery.isLoading ? <LoadingState label="Loading reports..." /> : reportsQuery.error ? <ErrorState error={reportsQuery.error} /> : studentsQuery.error ? <ErrorState error={studentsQuery.error} /> : reports.length ? (
      <div className="grid gap-4 md:grid-cols-2">
        {reports.map((report) => {
          const student = studentsQuery.data?.find((item) => item.id === report.studentId);
          return (
            <Card key={report.id}>
              <h2 className="text-lg font-black text-brand-navy">{student?.name ?? report.studentId}</h2>
              <p className="mt-1 text-sm text-slate-500">{report.className} - {report.term} - {report.academicYear}</p>
              <div className="mt-4 rounded-lg bg-slate-50 p-4 text-sm text-slate-600">{report.summary || `Status: ${report.status}`}</div>
            </Card>
          );
        })}
      </div>
      ) : <EmptyState label="No report cards found." />}
    </ProtectedShell>
  );
}
