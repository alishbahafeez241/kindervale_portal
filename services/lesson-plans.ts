"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/school/lesson-plans";
const KEY = queryKeys.lessonPlans;

export interface LessonPlan {
  id: string;
  title: string;
  subject: string;
  className: string;
  teacherId: string;
  teacherName?: string;
  date: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
  content?: string;
}

export type LessonPlanPayload = Partial<Omit<LessonPlan, "id">>;

export function useLessonPlans() { return useResourceList<LessonPlan>(KEY, PATH); }
export function useCreateLessonPlan() { return useCreateResource<LessonPlan, LessonPlanPayload>(KEY, PATH); }
export function useUpdateLessonPlan() { return useUpdateResource<LessonPlan, LessonPlanPayload>(KEY, PATH); }
export function useDeleteLessonPlan() { return useDeleteResource(KEY, PATH); }
