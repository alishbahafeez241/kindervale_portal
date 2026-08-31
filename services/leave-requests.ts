"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/school/leave-requests";
const KEY = queryKeys.leaveRequests;

export interface LeaveRequest { id: string; userId: string; userName?: string; type: string; startDate: string; endDate: string; reason: string; status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"; reviewedBy?: string; }
export type LeaveRequestPayload = Partial<Omit<LeaveRequest, "id">>;

export function useLeaveRequests() { return useResourceList<LeaveRequest>(KEY, PATH); }
export function useCreateLeaveRequest() { return useCreateResource<LeaveRequest, LeaveRequestPayload>(KEY, PATH); }
export function useUpdateLeaveRequest() { return useUpdateResource<LeaveRequest, LeaveRequestPayload>(KEY, PATH); }
export function useDeleteLeaveRequest() { return useDeleteResource(KEY, PATH); }
