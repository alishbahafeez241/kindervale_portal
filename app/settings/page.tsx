"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useSettings, useUpdateSettings } from "@/services/settings";
import type { Settings } from "@/types";
import { Save } from "lucide-react";

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();
  const [form, setForm] = useState<Settings>({ schoolName: "", academicYear: "", timezone: "" });
  const [dirty, setDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
      setDirty(false);
    }
  }, [settings]);

  function handleChange(key: keyof Settings, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    setDirty(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      await updateSettings.mutateAsync(form);
      toast.success("Settings saved");
      setDirty(false);
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save settings");
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ProtectedShell title="Settings">
      {isLoading ? (
        <LoadingState label="Loading settings..." />
      ) : error ? (
        <ErrorState error={error} />
      ) : settings ? (
        <form onSubmit={handleSave}>
          <Card>
            <h2 className="mb-6 text-base font-black text-[#2e5a75]">School Configuration</h2>
            <div className="grid gap-5 md:grid-cols-3">
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">School Name</span>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2e5a75] focus:ring-2 focus:ring-[#2e5a75]/10"
                  value={form.schoolName}
                  onChange={e => handleChange("schoolName", e.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">Academic Year</span>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2e5a75] focus:ring-2 focus:ring-[#2e5a75]/10"
                  placeholder="e.g. 2024-2025"
                  value={form.academicYear}
                  onChange={e => handleChange("academicYear", e.target.value)}
                />
              </label>
              <label className="block">
                <span className="mb-1.5 block text-xs font-bold uppercase text-slate-500">Timezone</span>
                <input
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 outline-none transition focus:border-[#2e5a75] focus:ring-2 focus:ring-[#2e5a75]/10"
                  placeholder="e.g. Asia/Karachi"
                  value={form.timezone}
                  onChange={e => handleChange("timezone", e.target.value)}
                />
              </label>
            </div>
            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={!dirty || isSaving}
                className="inline-flex items-center gap-2 rounded-full bg-[#2e5a75] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#234762] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Save className="h-4 w-4" />
                {isSaving ? "Saving…" : "Save Settings"}
              </button>
              {dirty && (
                <span className="text-xs font-semibold text-amber-600">Unsaved changes</span>
              )}
            </div>
          </Card>
        </form>
      ) : (
        <EmptyState label="No settings found." />
      )}
    </ProtectedShell>
  );
}
