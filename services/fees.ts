import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Fee } from "@/types";

export type FeePayload = Partial<Omit<Fee, "id" | "status">> & { status?: "PAID" | "PENDING" | "PARTIAL" };

function statusLabel(status: string | undefined): Fee["status"] {
  if (status === "PAID" || status === "Paid") return "Paid";
  if (status === "PARTIAL" || status === "Partial") return "Partial";
  return "Pending";
}

export function mapFee(row: Record<string, unknown>): Fee {
  return {
    id: String(row.id),
    invoice: String(row.invoice ?? ""),
    studentId: String(row.studentId ?? ""),
    amount: Number(row.amount ?? 0),
    dueDate: String(row.dueDate ?? ""),
    status: statusLabel(String(row.status ?? "PENDING"))
  };
}

export function useFees() {
  return useResourceList<Record<string, unknown>, Fee[]>(queryKeys.fees, "/fees", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapFee) ?? []
  });
}

export const useCreateFee = () => useCreateResource<Fee, FeePayload>(queryKeys.fees, "/fees");
export const useUpdateFee = () => useUpdateResource<Fee, FeePayload>(queryKeys.fees, "/fees");
export const useDeleteFee = () => useDeleteResource(queryKeys.fees, "/fees");
