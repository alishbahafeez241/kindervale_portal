"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { DataTable } from "@/components/tables/data-table";
import { ErrorState, LoadingState } from "@/components/state/query-state";
import { Badge } from "@/components/ui/badge";
import { Modal } from "@/components/ui/modal";
import { StudentIdCardModal } from "@/components/students/student-id-card-modal";
import { useStudents, useCreateStudent, useUpdateStudent, useDeleteStudent, type StudentPayload } from "@/services/student";
import type { Student } from "@/types";
import { Download, Plus, Pencil, Trash2 } from "lucide-react";

const EMPTY_FORM: StudentPayload = {
  admissionNo: "",
  name: "",
  className: "",
  age: 5,
  birthday: "",
  phone: "",
  feeStatus: "PENDING"
};

export default function StudentsPage() {
  const { data: students = [], isLoading, error } = useStudents();
  const createStudent = useCreateStudent();
  const updateStudent = useUpdateStudent();
  const deleteStudent = useDeleteStudent();

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [createOpen, setCreateOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Student | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Student | null>(null);
  const [form, setForm] = useState<StudentPayload>(EMPTY_FORM);
  const [isSaving, setIsSaving] = useState(false);

  function openCreate() {
    setForm(EMPTY_FORM);
    setCreateOpen(true);
  }

  function openEdit(student: Student) {
    setEditTarget(student);
    setForm({
      admissionNo: student.id,
      name: student.name,
      className: student.className,
      age: student.age,
      birthday: student.birthday,
      phone: student.phone,
      feeStatus: student.feeStatus === "Paid" ? "PAID" : student.feeStatus === "Partial" ? "PARTIAL" : "PENDING"
    });
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await createStudent.mutateAsync(form);
      toast.success("Student created successfully");
      setCreateOpen(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to create student");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleUpdate(e: React.FormEvent) {
    e.preventDefault();
    if (!editTarget) return;
    setIsSaving(true);
    try {
      await updateStudent.mutateAsync({ id: editTarget.id, payload: form });
      toast.success("Student updated successfully");
      setEditTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to update student");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) return;
    setIsSaving(true);
    try {
      await deleteStudent.mutateAsync(deleteTarget.id);
      toast.success("Student deleted");
      setDeleteTarget(null);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to delete student");
    } finally {
      setIsSaving(false);
    }
  }

  function StudentForm({ onSubmit }: { onSubmit: (e: React.FormEvent) => Promise<void> }) {
    return (
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Admission No *</span>
            <input required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.admissionNo ?? ""} onChange={e => setForm(f => ({ ...f, admissionNo: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Full Name *</span>
            <input required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.name ?? ""} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Class *</span>
            <input required className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.className ?? ""} onChange={e => setForm(f => ({ ...f, className: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Age *</span>
            <input required type="number" min={1} max={18} className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.age ?? ""} onChange={e => setForm(f => ({ ...f, age: Number(e.target.value) }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Birthday *</span>
            <input required type="date" className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.birthday ?? ""} onChange={e => setForm(f => ({ ...f, birthday: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Phone</span>
            <input className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.phone ?? ""} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold text-slate-600">Fee Status</span>
            <select className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm outline-none focus:border-[#2e5a75]" value={form.feeStatus ?? "PENDING"} onChange={e => setForm(f => ({ ...f, feeStatus: e.target.value as "PAID" | "PENDING" | "PARTIAL" }))}>
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
    <ProtectedShell title="Students">
      {isLoading ? (
        <LoadingState label="Loading students..." />
      ) : error ? (
        <ErrorState error={error} />
      ) : (
        <>
          {/* Toolbar */}
          <div className="mb-4 flex justify-end">
            <button
              onClick={openCreate}
              className="inline-flex items-center gap-2 rounded-full bg-[#2e5a75] px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#234762]"
            >
              <Plus className="h-4 w-4" />
              Add Student
            </button>
          </div>

          <DataTable<Student>
            data={students}
            searchLabel="Search students"
            columns={[
              { key: "id", label: "ID" },
              { key: "name", label: "Name" },
              { key: "className", label: "Class" },
              { key: "age", label: "Age" },
              { key: "attendance", label: "Attendance", render: (row) => `${row.attendance}%` },
              { key: "parentName", label: "Parent" },
              {
                key: "feeStatus",
                label: "Fee",
                render: (row) => (
                  <Badge tone={row.feeStatus === "Paid" ? "ok" : row.feeStatus === "Partial" ? "warn" : "bad"}>
                    {row.feeStatus}
                  </Badge>
                )
              },
              {
                key: "actions" as keyof Student,
                label: "Actions",
                render: (row) => (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedStudent(row)}
                      title="ID Card"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-[#2e5a75] shadow-sm hover:bg-slate-50"
                    >
                      <Download className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => openEdit(row)}
                      title="Edit"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-amber-600 shadow-sm hover:bg-amber-50"
                    >
                      <Pencil className="h-3.5 w-3.5" />
                    </button>
                    <button
                      onClick={() => setDeleteTarget(row)}
                      title="Delete"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-bold text-red-600 shadow-sm hover:bg-red-50"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )
              }
            ]}
          />

          {/* ID Card modal */}
          {selectedStudent && (
            <StudentIdCardModal
              student={selectedStudent}
              isOpen={Boolean(selectedStudent)}
              onClose={() => setSelectedStudent(null)}
            />
          )}

          {/* Create modal */}
          <Modal isOpen={createOpen} onClose={() => setCreateOpen(false)} title="Add Student">
            <StudentForm onSubmit={handleCreate} />
          </Modal>

          {/* Edit modal */}
          <Modal isOpen={Boolean(editTarget)} onClose={() => setEditTarget(null)} title="Edit Student">
            <StudentForm onSubmit={handleUpdate} />
          </Modal>

          {/* Delete confirm */}
          <Modal isOpen={Boolean(deleteTarget)} onClose={() => setDeleteTarget(null)} title="Delete Student" size="sm">
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
