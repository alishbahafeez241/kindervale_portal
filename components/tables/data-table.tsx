"use client";

import { ArrowUpDown, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";

interface Column<T> {
  key: keyof T | (string & {});
  label: string;
  render?: (row: T) => React.ReactNode;
}

export function DataTable<T extends { id: string }>({ columns, data, searchLabel = "Search", pageSize = 6 }: { columns: Column<T>[]; data: T[]; searchLabel?: string; pageSize?: number }) {
  const [query, setQuery] = useState("");
  const [sortKey, setSortKey] = useState<keyof T>(columns[0].key as keyof T);
  const [page, setPage] = useState(1);
  const size = pageSize;

  const rows = useMemo(() => {
    const normalized = query.toLowerCase();
    return [...data]
      .filter((row) => JSON.stringify(row).toLowerCase().includes(normalized))
      .sort((a, b) => String(a[sortKey] ?? "").localeCompare(String(b[sortKey] ?? "")));
  }, [data, query, sortKey]);

  const totalPages = Math.max(1, Math.ceil(rows.length / size));
  const visible = rows.slice((page - 1) * size, page * size);

  return (
    <div className="space-y-4">
      <label className="flex max-w-sm items-center gap-2 rounded-lg border border-[#e6edf2] bg-white px-3 py-2">
        <Search size={18} className="text-slate-400" />
        <span className="sr-only">{searchLabel}</span>
        <input value={query} onChange={(event) => { setQuery(event.target.value); setPage(1); }} placeholder={searchLabel} className="min-w-0 flex-1 outline-none" />
      </label>
      <div className="overflow-x-auto">
        <table>
          <thead>
            <tr>
              {columns.map((column) => (
                <th key={String(column.key)}>
                  <button className="inline-flex items-center gap-1" onClick={() => setSortKey(column.key as keyof T)}>
                    {column.label}
                    <ArrowUpDown size={14} />
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {visible.map((row) => (
              <tr key={row.id}>
                {columns.map((column) => (
                  <td key={String(column.key)}>{column.render ? column.render(row) : String(row[column.key as keyof T] ?? "")}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!visible.length && <div className="rounded-lg bg-slate-50 p-6 text-center text-sm text-slate-500">No records found.</div>}
      <div className="flex items-center justify-between">
        <p className="text-sm text-slate-500">Page {page} of {totalPages}</p>
        <div className="flex gap-2">
          <Button variant="outline" disabled={page === 1} onClick={() => setPage((value) => value - 1)}>Previous</Button>
          <Button variant="outline" disabled={page === totalPages} onClick={() => setPage((value) => value + 1)}>Next</Button>
        </div>
      </div>
    </div>
  );
}
