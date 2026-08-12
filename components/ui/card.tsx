import { clsx } from "clsx";

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return <section className={clsx("rounded-lg border border-[#e6edf2] bg-white p-6 shadow-soft", className)}>{children}</section>;
}
