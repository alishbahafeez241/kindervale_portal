"use client";

import { CalendarDays } from "lucide-react";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useCalendarEvents } from "@/services/calendar";
import { prettyDate } from "@/utils/format";

export default function CalendarPage() {
  const { data: events = [], isLoading, error } = useCalendarEvents();

  return (
    <ProtectedShell title="Annual Calendar">
      {isLoading ? <LoadingState label="Loading calendar..." /> : error ? <ErrorState error={error} /> : events.length ? (
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {events.map((event) => (
          <Card key={event.id}>
            <CalendarDays className="mb-4 text-brand-navy" />
            <h2 className="text-lg font-black text-brand-navy">{event.title}</h2>
            <p className="mt-1 text-sm text-slate-500">{prettyDate(event.date)} - {event.type}</p>
          </Card>
        ))}
      </div>
      ) : <EmptyState label="No calendar events found." />}
    </ProtectedShell>
  );
}
