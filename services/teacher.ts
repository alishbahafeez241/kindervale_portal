import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Teacher } from "@/types";

export type TeacherPayload = Partial<Omit<Teacher, "id" | "name" | "email" | "attendance">> & {
  userId?: string;
  attendance?: "PRESENT" | "LATE" | "ABSENT";
};

function attendanceLabel(status: string | undefined): Teacher["attendance"] {
  if (status === "LATE" || status === "Late") return "Late";
  if (status === "ABSENT" || status === "Absent") return "Absent";
  return "Present";
}

/**
 * Maps a raw teacher row (joined with the users table on the backend)
 * to the frontend Teacher shape. The backend now returns name + email
 * via a LEFT JOIN with usersTable.
 */
export function mapTeacher(row: Record<string, unknown>): Teacher {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    subject: String(row.subject ?? ""),
    className: String(row.className ?? ""),
    attendance: attendanceLabel(String(row.attendance ?? "PRESENT"))
  };
}

export function useTeachers() {
  return useResourceList<Record<string, unknown>, Teacher[]>(queryKeys.teachers, "/teachers", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapTeacher) ?? []
  });
}

export const useCreateTeacher = () => useCreateResource<Teacher, TeacherPayload>(queryKeys.teachers, "/teachers");
export const useUpdateTeacher = () => useUpdateResource<Teacher, TeacherPayload>(queryKeys.teachers, "/teachers");
export const useDeleteTeacher = () => useDeleteResource(queryKeys.teachers, "/teachers");

