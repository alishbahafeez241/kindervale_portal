import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/services/api";
import { queryKeys } from "@/services/query-keys";
import { useAuth } from "@/context/auth-context";
import type { Settings } from "@/types";

export function useSettings() {
  const { authInitialized, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.settings,
    enabled: authInitialized && isAuthenticated,
    queryFn: () => apiRequest<Settings | null>("/settings")
  });
}

export function useUpdateSettings() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: Settings) => apiRequest<Settings>("/settings", { method: "PATCH", data: payload }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.settings })
  });
}

