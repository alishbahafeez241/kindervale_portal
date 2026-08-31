"use client";

import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useFAQs } from "@/services/faqs";

export default function FAQsPage() {
  const { data: faqs, isLoading, isError } = useFAQs();

  return (
    <ProtectedShell title="FAQs">
      {isLoading && <LoadingState />}
      {isError && <ErrorState />}
      {!isLoading && !isError && (!faqs || faqs.length === 0) && (
        <EmptyState message="No FAQs added yet." />
      )}
      {faqs && faqs.length > 0 && (
        <div className="space-y-4">
          {faqs.map((faq) => (
            <Card key={faq.id} className="p-4">
              <h3 className="font-bold text-brand-navy">{faq.question}</h3>
              <p className="mt-2 text-sm text-slate-600">{faq.answer}</p>
              {faq.category && (
                <p className="mt-1 text-xs text-slate-400">Category: {faq.category}</p>
              )}
            </Card>
          ))}
        </div>
      )}
    </ProtectedShell>
  );
}
