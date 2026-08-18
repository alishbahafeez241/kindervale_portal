"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { useTeachers, useUpdateTeacher, useDeleteTeacher, type TeacherPayload } from "@/services/teacher";
import type { Teacher } from "@/types";
import { Pencil, Trash2 } from "lucide-react";

export default function TeachersPage() {
  const { data: teachers = [], isLoading, error } = useTeachers();
  const updateTeacher = useUpdateTeacher();
  const deleteTeacher = useDeleteTeacher();

  const [editTarget, setEditTarget] = useState<Teacher | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Teacher | null>(null);
  const [form, setForm] = useState<TeacherPayload>({});
  const [isSaving, setIsSaving] = useState(false);

  function openEdit(teacher: Teacher) {
    setEditTarget(teacher);
    setForm({
      name: teacher.name,
      phone: teacher.phone,
      subject: teacher.subject,
      className: teacher.className,
      attendance: teacher.attendance === "Present" ? "PRESENT" : teacher.attendance === "Late" ? "LATE" : "ABSENT"
    });
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setIsSaving(true);
    try {
      await updateTeacher.mutateAsync({ id: editTarget.id, payload: form });
      toast.success("Teacher updated successfully");
      setEditTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update teacher");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsSaving(true);
    try {
      await deleteTeacher.mutateAsync(deleteTarget.id);
      toast.success("Teacher deleted");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to delete teacher");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ProtectedShell title="Teachers">
      {isLoading ? (
        <LoadingState label="Loading teachers..." />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <>
          <DataTable<Teacher>
            data={teachers}
            searchLabel="Search teachers"
            columns={[
              { key: "name", label: "Name" },
              { key: "email", label: "Email" },
              { key: "subject", label: "Subject" },
              { key: "className", label: "Class" },
              { key: "phone", label: "Phone" },
              {
                key: "attendance",
                label: "Attendance",
                render: (row) => (
                  <Badge tone={row.attendance === "Present" ? "ok" : row.attendance === "Late" ? "warn" : "bad"}>
                    {row.attendance}
                  </Badge>
                )
              },
              {
                key: "actions" as keyof Teacher,
                label: "Actions",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => openEdit(row)}
                      title="Edit teacher"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteTarget(row)}
                      title="Delete teacher"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                )
              }
            ]}
          />

          {/* Edit modal */}
          <Modal isOpen={Boolean(editTarget)} onClose={() => setEditTarget(null)} title={`Edit — ${editTarget?.name ?? ""}`}>
            <form onSubmit={handleUpdate} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs font-bold text-slate-600">Name</span>
                  <input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.name ?? ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-600">Subject</span>
                  <input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.subject ?? ""} onChange={e => setForm(f => ({ ...f, subject: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-600">Class</span>
                  <input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.className ?? ""} onChange={e => setForm(f => ({ ...f, className: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-600">Phone</span>
                  <input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.phone ?? ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-bold text-slate-600">Attendance</span>
                  <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.attendance ?? "PRESENT"} onChange={e => setForm(f => ({ ...f, attendance: e.target.value as "PRESENT" | "LATE" | "ABSENT" }))}>
                    <option value="PRESENT">Present</option>
                    <option value="LATE">Late</option>
                    <option value="ABSENT">Absent</option>
                  </select>
                </label>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button type="button" onClick={() => setEditTarget(null)} className="rounded-full border border-slate-300 px-5 py-2 text-sm font-semibold text-slate-600 hover:bg-slate-50">
                  Cancel
                </button>
                <button type="submit" disabled={isSaving} className="rounded-full bg-[#2e5a75] px-6 py-2 text-sm font-bold text-white transition hover:bg-[#234762] disabled:opacity-60">
                  {isSaving ? "Saving…" : "Save Changes"}
                </button>
              </div>
            </form>
          </Modal>

          {/* Delete confirm */}
          <Modal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete Teacher" size="sm">
            <p className="mb-6 text-sm text-slate-600">
              Are you sure you want to delete <strong>{deleteTarget?.name}</strong>? This action cannot be undone.
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
