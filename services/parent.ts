import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Parent, Student } from "@/types";

export type ParentPayload = Partial<Omit<Parent, "id" | "studentIds">> & { userId?: string };

export function mapParent(row: Record<string, unknown>): Parent {
  return {
    id: String(row.id),
    name: String(row.name ?? ""),
    email: String(row.email ?? ""),
    phone: String(row.phone ?? ""),
    studentIds: Array.isArray(row.studentIds) ? row.studentIds.map((id) => String(id)) : []
  };
}

export function useParents() {
  return useResourceList<Record<string, unknown>, Parent[]>(queryKeys.parents, "/parents", {
    params: { page: 1, limit: 10 },
    select: (items) => items?.map(mapParent) ?? []
  });
}

export const useCreateParent = () => useCreateResource<Parent, ParentPayload>(queryKeys.parents, "/parents");
export const useUpdateParent = () => useUpdateResource<Parent, ParentPayload>(queryKeys.parents, "/parents");
export const useDeleteParent = () => useDeleteResource(queryKeys.parents, "/parents");
