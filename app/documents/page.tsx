"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useDocuments } from "@/services/documents";
import type { SchoolDocument } from "@/services/documents";

export default function DocumentsPage() {
  const { data: docs, isLoading, isError, error } = useDocuments();

  return (
    <ProtectedShell title="Documents">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!docs || docs.length === 0) && (
        <EmptyState label="No documents uploaded." />
      )}
      {docs && docs.length > 0 && (
        <DataTable<SchoolDocument>
          data={docs}
          columns={[
            { key: "title", label: "Title" },
            { key: "type", label: "Type" },
            { key: "uploadedBy", label: "Uploaded By" },
            { key: "createdAt", label: "Date" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
