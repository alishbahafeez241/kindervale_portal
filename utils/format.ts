import { format } from "date-fns";

export function money(value: number) {
  return new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(value);
}

export function prettyDate(value: string) {
  return format(new Date(`${value}T00:00:00`), "MMM d, yyyy");
}

export function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}
