import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";
import type { Notification } from "@/types";

export type NotificationPayload = Partial<Omit<Notification, "id" | "audience">> & {
  audience?: "ALL" | "ADMIN" | "PRINCIPAL" | "TEACHER" | "PARENT" | "STUDENT";
};

export function useNotifications() {
  return useResourceList<Notification>(queryKeys.notifications, "/notifications");
}

export const useCreateNotification = () => useCreateResource<Notification, NotificationPayload>(queryKeys.notifications, "/notifications");
export const useUpdateNotification = () => useUpdateResource<Notification, NotificationPayload>(queryKeys.notifications, "/notifications");
export const useDeleteNotification = () => useDeleteResource(queryKeys.notifications, "/notifications");
