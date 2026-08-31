"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useDocuments } from "@/services/documents";
import type { SchoolDocument } from "@/services/documents";

export default function DocumentsPage() {
  const { data: docs, isLoading, isError } = useDocuments();

  return (
    <ProtectedShell title="Documents">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!docs || docs.length === 0) && (
        <EmptyState message="No documents uploaded." />
      )}
      {docs && docs.length > 0 && (
        <DataTable<SchoolDocument>
          data={docs}
          columns={[
            { key: "title", header: "Title" },
            { key: "type", header: "Type" },
            { key: "uploadedBy", header: "Uploaded By" },
            { key: "createdAt", header: "Date" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
