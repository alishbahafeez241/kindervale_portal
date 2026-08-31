"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/school/faqs";
const KEY = queryKeys.faqs;

export interface FAQ { id: string; question: string; answer: string; category?: string; }
export type FAQPayload = Partial<Omit<FAQ, "id">>;

export function useFAQs() { return useResourceList<FAQ>(KEY, PATH); }
export function useCreateFAQ() { return useCreateResource<FAQ, FAQPayload>(KEY, PATH); }
export function useUpdateFAQ() { return useUpdateResource<FAQ, FAQPayload>(KEY, PATH); }
export function useDeleteFAQ() { return useDeleteResource(KEY, PATH); }
