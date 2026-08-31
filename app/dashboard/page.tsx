import { ExactPortal } from "@/components/dashboard/exact-portal";

export const metadata = {
  title: "Dashboard — Kindervale Preschool",
  description: "Kindervale Preschool School Information System Dashboard."
};

export default function DashboardPage() {
  return <ExactPortal defaultView="dashboard" />;
}
