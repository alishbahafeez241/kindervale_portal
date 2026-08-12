"use client";

import { useMutation, useQuery, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { apiRequest, normalizeList, type PaginatedResponse, type QueryValue } from "@/services/api";
import { useAuth } from "@/context/auth-context";

type IdPayload<TPayload> = { id: string; payload: TPayload };

export function getList<T>(path: string, params?: Record<string, QueryValue>) {
  return apiRequest<T[] | PaginatedResponse<T>>(path, { query: params }).then(normalizeList);
}

export function getItem<T>(path: string, id: string) {
  return apiRequest<T>(`${path}/${id}`);
}

export function createItem<T, TPayload>(path: string, payload: TPayload) {
  return apiRequest<T>(path, { method: "POST", data: payload });
}

export function updateItem<T, TPayload>(path: string, id: string, payload: TPayload) {
  return apiRequest<T>(`${path}/${id}`, { method: "PATCH", data: payload });
}

export function deleteItem(path: string, id: string) {
  return apiRequest<{ deleted?: boolean }>(`${path}/${id}`, { method: "DELETE" });
}

export function useResourceList<T, R = T[]>(
  queryKey: QueryKey,
  path: string,
  options?: {
    params?: Record<string, QueryValue>;
    enabled?: boolean;
    select?: (items: T[] | undefined) => R;
  }
) {
  const { authInitialized, isAuthenticated } = useAuth();
  const enabled = options?.enabled ?? (authInitialized && isAuthenticated);

  return useQuery<R | undefined>({
    queryKey: options?.params ? [...(Array.isArray(queryKey) ? queryKey : [queryKey]), options.params] : queryKey,
    queryFn: () => getList<T>(path, options?.params) as Promise<any>,
    enabled,
    select: options?.select as any
  });
}

export function useCreateResource<T, TPayload>(queryKey: QueryKey, path: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: TPayload) => createItem<T, TPayload>(path, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });
}

export function useUpdateResource<T, TPayload>(queryKey: QueryKey, path: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: IdPayload<TPayload>) => updateItem<T, TPayload>(path, id, payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });
}

export function useDeleteResource(queryKey: QueryKey, path: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteItem(path, id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey })
  });
}
