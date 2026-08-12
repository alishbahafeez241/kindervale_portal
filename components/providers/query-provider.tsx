"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { ApiError } from "@/services/api";

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30_000,
            retry: (failureCount: number, error: unknown) => {
              // Only retry network errors or server (5xx) errors once.
              if (error instanceof ApiError) {
                const status = error.status || 0;
                if (status >= 500 || status === 0) return failureCount < 1;
                return false;
              }
              // non-ApiError network failures may be retryable
              return failureCount < 1;
            },
            refetchOnWindowFocus: false
          }
        }
      })
  );

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
}
