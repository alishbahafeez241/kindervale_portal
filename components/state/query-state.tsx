import { Card } from "@/components/ui/card";

export function LoadingState({ label = "Loading data..." }: { label?: string }) {
  return <Card><p className="text-sm font-semibold text-slate-500">{label}</p></Card>;
}

export function ErrorState({ error }: { error: unknown }) {
  const message = error instanceof Error ? error.message : "Unable to load data.";
  return <Card><p className="text-sm font-semibold text-rose-600">{message}</p></Card>;
}

export function EmptyState({ label = "No records found." }: { label?: string }) {
  return <Card><p className="text-sm font-semibold text-slate-500">{label}</p></Card>;
}
