"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/documents";
const KEY = queryKeys.documents;

export interface SchoolDocument { id: string; title: string; type: string; url?: string; uploadedBy?: string; createdAt?: string; }
export type DocumentPayload = Partial<Omit<SchoolDocument, "id">>;

export function useDocuments() { return useResourceList<SchoolDocument>(KEY, PATH); }
export function useCreateDocument() { return useCreateResource<SchoolDocument, DocumentPayload>(KEY, PATH); }
export function useDeleteDocument() { return useDeleteResource(KEY, PATH); }
