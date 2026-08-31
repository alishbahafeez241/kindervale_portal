"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const CLASS_PATH = "/classroom/classes";
const CLASS_KEY = queryKeys.classes;
const SECTION_PATH = "/classroom/sections";
const SECTION_KEY = queryKeys.sections;

export interface ClassRoom { id: string; name: string; teacher?: string; capacity?: number; }
export interface Section { id: string; name: string; classId: string; className?: string; }
export type ClassPayload = Partial<Omit<ClassRoom, "id">>;
export type SectionPayload = Partial<Omit<Section, "id">>;

export function useClasses() { return useResourceList<ClassRoom>(CLASS_KEY, CLASS_PATH); }
export function useCreateClass() { return useCreateResource<ClassRoom, ClassPayload>(CLASS_KEY, CLASS_PATH); }
export function useUpdateClass() { return useUpdateResource<ClassRoom, ClassPayload>(CLASS_KEY, CLASS_PATH); }
export function useDeleteClass() { return useDeleteResource(CLASS_KEY, CLASS_PATH); }

export function useSections() { return useResourceList<Section>(SECTION_KEY, SECTION_PATH); }
export function useCreateSection() { return useCreateResource<Section, SectionPayload>(SECTION_KEY, SECTION_PATH); }
