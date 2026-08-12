"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useFees, useCreateFee, useUpdateFee, useDeleteFee, type FeePayload } from "@/services/fees";
import { useStudents } from "@/services/student";
import type { Fee } from "@/types";
import { money, prettyDate } from "@/utils/format";
import { Plus, Pencil, Trash2 } from "lucide-react";

const EMPTY_FEE: FeePayload = {
  invoice: "",
  studentId: "",
  amount: 0,
  dueDate: "",
  status: "PENDING"
};

export default function FeesPage() {
  const feesQuery = useFees();
  const studentsQuery = useStudents();
  const createFee = useCreateFee();
  const updateFee = useUpdateFee();
  const deleteFee = useDeleteFee();

  const students = studentsQuery.data ?? [];

  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Fee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Fee | null>(null);
  const [form, setForm] = useState<FeePayload>(EMPTY_FEE);
  const [isSaving, setIsSaving] = useState(false);

  function openCreate() {
    setForm(EMPTY_FEE);
    setCreateOpen(true);
  }

  function openEdit(fee: Fee) {
    setEditTarget(fee);
    setForm({
      invoice: fee.invoice,
      studentId: fee.studentId,
      amount: fee.amount,
      dueDate: fee.dueDate,
      status: fee.status === "Paid" ? "PAID" : fee.status === "Partial" ? "PARTIAL" : "PENDING"
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await createFee.mutateAsync(form);
      toast.success("Fee record created");
      setCreateOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to create fee record");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setIsSaving(true);
    try {
      await updateFee.mutateAsync({ id: editTarget.id, payload: form });
      toast.success("Fee updated");
      setEditTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update fee");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsSaving(true);
    try {
      await deleteFee.mutateAsync(deleteTarget.id);
      toast.success("Fee record deleted");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to delete fee");
    } finally {
      setIsSaving(false);
    }
  }

  function FeeForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => Promise<void> }) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Invoice # *</span>
            <input required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" placeholder="e.g. INV-2401" value={form.invoice ?? ""} onChange={e => setForm(f => ({ ...f, invoice: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Student *</span>
            <select required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.studentId ?? ""} onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}>
              <option value="">Select student…</option>
              {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Amount (PKR) *</span>
            <input required type="number" min={0} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.amount ?? ""} onChange={e => setForm(f => ({ ...f, amount: Number(e.target.value) }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Due Date *</span>
            <input required type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.dueDate ?? ""} onChange={e => setForm(f => ({ ...f, dueDate: e.target.value }))} />
          </label>
          <label className="block sm:col-span-2">
            <span className="mb-1 block text-xs font-bold text-slate-600">Status *</span>
            <select required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.status ?? "PENDING"} onChange={e => setForm(f => ({ ...f, status: e.target.value as "PAID" | "PENDING" | "PARTIAL" }))}>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="PARTIAL">Partial</option>
            </select>
          </label>
        </div>
        <div className="flex justify-end gap-3 pt-2">
          <button type="submit" disabled={isSaving} className="rounded-full bg-[#2e5a75] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#234762] disabled:opacity-60">
            {isSaving ? "Saving…" : "Save"}
          </button>
        </div>
      </form>
    );
  }

  return (
    <ProtectedShell title="Fees">
      {feesQuery.isLoading || studentsQuery.isLoading ? (
        <LoadingState label="Loading fees..." />
      ) : feesQuery.error ? (
        <ErrorState error={feesQuery.error} />
      ) : studentsQuery.error ? (
        <ErrorState error={studentsQuery.error} />
      ) : (
        <>
          <div className="mb-4 flex justify-end">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-[#2e5a75] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#234762]"
            >
              <Plus className="h-4 w-4" />
              Add Fee Record
            </button>
          </div>

          <DataTable<Fee>
            data={feesQuery.data ?? []}
            searchLabel="Search fees"
            columns={[
              { key: "invoice", label: "Invoice" },
              { key: "studentId", label: "Student", render: (row) => students.find(s => s.id === row.studentId)?.name ?? row.studentId },
              { key: "amount", label: "Amount", render: (row) => money(row.amount) },
              { key: "dueDate", label: "Due", render: (row) => prettyDate(row.dueDate) },
              {
                key: "status",
                label: "Status",
                render: (row) => (
                  <Badge tone={row.status === "Paid" ? "ok" : row.status === "Partial" ? "warn" : "bad"}>
                    {row.status}
                  </Badge>
                )
              },
              {
                key: "actions" as keyof Fee,
                label: "Actions",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <button onClick={() => openEdit(row)} title="Edit" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-50">
                      <Pencil className="h-3.5 w-3.5" /> Edit
                    </button>
                    <button onClick={() => setDeleteTarget(row)} title="Delete" className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50">
                      <Trash2 className="h-3.5 w-3.5" /> Delete
                    </button>
                  </div>
                )
              }
            ]}
          />

          <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add Fee Record">
            <FeeForm onSubmit={handleCreate} />
          </Modal>

          <Modal isOpen={Boolean(editTarget)} onClose={() => setEditTarget(null)} title={`Edit Fee — ${editTarget?.invoice ?? ""}`}>
            <FeeForm onSubmit={handleUpdate} />
          </Modal>

          <Modal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete Fee Record" size="sm">
            <p className="mb-6 text-sm text-slate-600">
              Delete fee record <strong>{deleteTarget?.invoice}</strong>? This cannot be undone.
            </p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setDeleteTarget(null)} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                Cancel
              </button>
              <button onClick={handleDelete} disabled={isSaving} className="rounded-full bg-red-600 px-5 py-2 text-sm font-bold text-white hover:bg-red-700 disabled:opacity-60">
                {isSaving ? "Deleting…" : "Delete"}
              </button>
            </div>
          </Modal>
        </>
      )}
    </ProtectedShell>
  );
}
