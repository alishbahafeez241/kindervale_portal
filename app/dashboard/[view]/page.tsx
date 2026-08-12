import { ExactPortal } from "@/components/dashboard/exact-portal";

export const metadata = {
  title: "Dashboard — Kindervale Preschool",
  description: "Kindervale Preschool School Information System Dashboard."
};

export default async function DashboardViewPage({ params }: { params: Promise<{ view: string }> }) {
  const { view } = await params;
  return <ExactPortal defaultView={view || "dashboard"} />;
}


