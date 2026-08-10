import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/services/api";
import { queryKeys } from "@/services/query-keys";
import { useAuth } from "@/context/auth-context";
import type { DashboardStats, Notification } from "@/types";

interface DashboardResponse {
  stats: {
    students: number;
    teachers: number;
    attendance: number;
    pendingFees: number;
  };
  notifications: Notification[];
}

export function useDashboard() {
  const { authInitialized, isAuthenticated } = useAuth();
  return useQuery({
    queryKey: queryKeys.dashboard,
    enabled: authInitialized && isAuthenticated,
    queryFn: async () => {
      const dashboard = await apiRequest<DashboardResponse>("/dashboard");
      return {
        stats: {
          students: dashboard.stats.students,
          teachers: dashboard.stats.teachers,
          attendanceRate: dashboard.stats.attendance,
          pendingFees: dashboard.stats.pendingFees
        } satisfies DashboardStats,
        notifications: dashboard.notifications ?? []
      };
    }
  });
}

