import { queryKeys } from "@/services/query-keys";
import { useCreateResource, useDeleteResource, useResourceList, useUpdateResource } from "@/services/resource-hooks";

export interface ReportCard {
  id: string;
  studentId: string;
  term: string;
  className: string;
  academicYear: string;
  summary?: string;
  fileUrl?: string;
  status: "DRAFT" | "PENDING" | "APPROVED" | "REJECTED";
}

export type ReportCardPayload = Partial<Omit<ReportCard, "id" | "status">> & { status?: ReportCard["status"] };

export function useReportCards() {
  return useResourceList<ReportCard>(queryKeys.reportCards, "/report-cards");
}

export const useCreateReportCard = () => useCreateResource<ReportCard, ReportCardPayload>(queryKeys.reportCards, "/report-cards");
export const useUpdateReportCard = () => useUpdateResource<ReportCard, ReportCardPayload>(queryKeys.reportCards, "/report-cards");
export const useDeleteReportCard = () => useDeleteResource(queryKeys.reportCards, "/report-cards");
