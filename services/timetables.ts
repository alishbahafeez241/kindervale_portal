"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/school/timetables";
const KEY = queryKeys.timetables;

export interface Timetable { id: string; className: string; day: string; period: string; subject: string; teacher: string; startTime?: string; endTime?: string; }
export type TimetablePayload = Partial<Omit<Timetable, "id">>;

export function useTimetables() { return useResourceList<Timetable>(KEY, PATH); }
export function useCreateTimetable() { return useCreateResource<Timetable, TimetablePayload>(KEY, PATH); }
export function useUpdateTimetable() { return useUpdateResource<Timetable, TimetablePayload>(KEY, PATH); }
export function useDeleteTimetable() { return useDeleteResource(KEY, PATH); }
