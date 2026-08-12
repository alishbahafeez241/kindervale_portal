import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";

export interface Homework {
  id: string;
  title: string;
  description?: string;
  className: string;
  subject: string;
  dueDate: string;
}

export type HomeworkPayload = Partial<Omit<Homework, "id">> & {
  classId?: string;
  subjectId?: string;
  teacherId?: string;
};

export function useHomework() {
  return useResourceList<Homework>(queryKeys.homework, "/homework", {
    params: { page: 1, limit: 10 }
  });
}

export const useCreateHomework = () => useCreateResource<Homework, HomeworkPayload>(queryKeys.homework, "/homework");
export const useUpdateHomework = () => useUpdateResource<Homework, HomeworkPayload>(queryKeys.homework, "/homework");
export const useDeleteHomework = () => useDeleteResource(queryKeys.homework, "/homework");
