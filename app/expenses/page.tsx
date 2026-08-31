"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useExpenses } from "@/services/expenses";
import type { Expense } from "@/services/expenses";
import { money, prettyDate } from "@/utils/format";

export default function ExpensesPage() {
  const { data: expenses, isLoading, isError, error } = useExpenses();

  return (
    <ProtectedShell title="Expenses">
      {isLoading && <LoadingState />}
      {isError && <ErrorState error={error} />}
      {!isLoading && !isError && (!expenses || expenses.length === 0) && (
        <EmptyState label="No expenses recorded." />
      )}
      {expenses && expenses.length > 0 && (
        <DataTable<Expense>
          data={expenses}
          columns={[
            { key: "title", label: "Title" },
            { key: "category", label: "Category" },
            { key: "amount", label: "Amount", render: (row) => money(row.amount) },
            { key: "date", label: "Date", render: (row) => prettyDate(row.date) },
            { key: "paidBy", label: "Paid By" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
