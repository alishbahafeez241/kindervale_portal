"use client";
import { queryKeys } from "@/services/query-keys";
import { useResourceList, useCreateResource, useUpdateResource, useDeleteResource } from "@/services/resource-hooks";

const PATH = "/school/expenses";
const KEY = queryKeys.expenses;

export interface Expense { id: string; title: string; category: string; amount: number; date: string; description?: string; paidBy?: string; }
export type ExpensePayload = Partial<Omit<Expense, "id">>;

export function useExpenses() { return useResourceList<Expense>(KEY, PATH); }
export function useCreateExpense() { return useCreateResource<Expense, ExpensePayload>(KEY, PATH); }
export function useUpdateExpense() { return useUpdateResource<Expense, ExpensePayload>(KEY, PATH); }
export function useDeleteExpense() { return useDeleteResource(KEY, PATH); }
