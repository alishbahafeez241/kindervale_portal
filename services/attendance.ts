import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Attendance } from "@/types";

export type AttendancePayload = Partial<Omit<Attendance, "id" | "status">> & {
  classId?: string;
  remarks?: string;
  status?: "PRESENT" | "ABSENT" | "LATE" | "EXCUSED";
};

function statusLabel(status: string | undefined): Attendance["status"] {
  if (status === "ABSENT" || status === "Absent") return "Absent";
  if (status === "LATE" || status === "Late") return "Late";
  if (status === "EXCUSED" || status === "Excused") return "Excused";
  return "Present";
}

export function mapAttendance(row: Record<string, unknown>): Attendance {
  return {
    id: String(row.id),
    studentId: String(row.studentId ?? ""),
    date: String(row.date ?? ""),
    status: statusLabel(String(row.status ?? "PRESENT"))
  };
}

export function useAttendance() {
  return useResourceList<Record<string, unknown>, Attendance[]>(queryKeys.attendance, "/attendance", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapAttendance) ?? []
  });
}

export const useCreateAttendance = () => useCreateResource<Attendance, AttendancePayload>(queryKeys.attendance, "/attendance");
export const useUpdateAttendance = () => useUpdateResource<Attendance, AttendancePayload>(queryKeys.attendance, "/attendance");
export const useDeleteAttendance = () => useDeleteResource(queryKeys.attendance, "/attendance");
