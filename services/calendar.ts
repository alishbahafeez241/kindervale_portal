import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";

export interface CalendarEvent {
  id: string;
  title: string;
  date: string;
  type: string;
}

export type CalendarEventPayload = Partial<Omit<CalendarEvent, "id">>;

export function useCalendarEvents() {
  return useResourceList<CalendarEvent>(queryKeys.calendarEvents, "/calendar-events");
}

export const useCreateCalendarEvent = () => useCreateResource<CalendarEvent, CalendarEventPayload>(queryKeys.calendarEvents, "/calendar-events");
export const useUpdateCalendarEvent = () => useUpdateResource<CalendarEvent, CalendarEventPayload>(queryKeys.calendarEvents, "/calendar-events");
export const useDeleteCalendarEvent = () => useDeleteResource(queryKeys.calendarEvents, "/calendar-events");
