"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/subjects";
const KEY = queryKeys.subjects;

export interface Subject { id: string; name: string; teacherId?: string; teacherName?: string; }
export type SubjectPayload = Partial<Omit<Subject, "id">>;

export function useSubjects() { return useResourceList<Subject>(KEY, PATH); }
export function useCreateSubject() { return useCreateResource<Subject, SubjectPayload>(KEY, PATH); }
export function useUpdateSubject() { return useUpdateResource<Subject, SubjectPayload>(KEY, PATH); }
export function useDeleteSubject() { return useDeleteResource(KEY, PATH); }
