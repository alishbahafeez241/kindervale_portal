import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatCard({ label, value, icon: Icon }: { label: string; value: string | number; icon: LucideIcon }) {
  return (
    <Card>
      <div className="flex items-center justify-between gap-4">
        <div>
          <div className="text-xs font-black uppercase tracking-wide text-slate-500">{label}</div>
          <div className="mt-2 text-3xl font-black text-brand-navy">{value}</div>
        </div>
        <div className="grid size-12 place-items-center rounded-lg bg-brand-cloud text-brand-navy">
          <Icon size={24} />
        </div>
      </div>
    </Card>
  );
}
