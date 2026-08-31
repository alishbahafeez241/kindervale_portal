"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { DataTable } from "@/components/tables/data-table";
import { useExpenses } from "@/services/expenses";
import type { Expense } from "@/services/expenses";
import { money, prettyDate } from "@/utils/format";

export default function ExpensesPage() {
  const { data: expenses, isLoading, isError } = useExpenses();

  return (
    <ProtectedShell title="Expenses">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!expenses || expenses.length === 0) && (
        <EmptyState message="No expenses recorded." />
      )}
      {expenses && expenses.length > 0 && (
        <DataTable<Expense>
          data={expenses}
          columns={[
            { key: "title", header: "Title" },
            { key: "category", header: "Category" },
            { key: "amount", header: "Amount", render: (row) => money(row.amount) },
            { key: "date", header: "Date", render: (row) => prettyDate(row.date) },
            { key: "paidBy", header: "Paid By" },
          ]}
        />
      )}
    </ProtectedShell>
  );
}
