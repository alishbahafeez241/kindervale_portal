import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Student } from "@/types";

export type StudentPayload = Partial<Omit<Student, "id" | "parentName" | "feeStatus">> & {
  admissionNo?: string;
  userId?: string;
  parentId?: string;
  feeStatus?: "PAID" | "PENDING" | "PARTIAL";
};

function feeStatusLabel(status: string | undefined): Student["feeStatus"] {
  if (status === "PAID" || status === "Paid") return "Paid";
  if (status === "PARTIAL" || status === "Partial") return "Partial";
  return "Pending";
}

export function mapStudent(row: Record<string, unknown>): Student {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    className: String(row.className ?? ""),
    age: Number(row.age ?? 0),
    birthday: String(row.birthday ?? ""),
    attendance: Number(row.attendance ?? 0),
    // Preserve distinct parentId and parentName when both are supplied by backend.
    parentId: String(row.parentId ?? ""),
    parentName: String(row.parentName ?? ""),
    phone: String(row.phone ?? ""),
    feeStatus: feeStatusLabel(String(row.feeStatus ?? "PENDING"))
  };
}

export function useStudents() {
  return useResourceList<Record<string, unknown>, Student[]>(queryKeys.students, "/students", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapStudent) ?? []
  });
}

export const useCreateStudent = () => useCreateResource<Student, StudentPayload>(queryKeys.students, "/students");
export const useUpdateStudent = () => useUpdateResource<Student, StudentPayload>(queryKeys.students, "/students");
export const useDeleteStudent = () => useDeleteResource(queryKeys.students, "/students");
