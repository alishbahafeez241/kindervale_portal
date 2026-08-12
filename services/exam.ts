import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Exam } from "@/types";

export type ExamPayload = Partial<Omit<Exam, "id">>;

export function useExams() {
  return useResourceList<Exam>(queryKeys.exams, "/exams");
}

export const useCreateExam = () => useCreateResource<Exam, ExamPayload>(queryKeys.exams, "/exams");
export const useUpdateExam = () => useUpdateResource<Exam, ExamPayload>(queryKeys.exams, "/exams");
export const useDeleteExam = () => useDeleteResource(queryKeys.exams, "/exams");
