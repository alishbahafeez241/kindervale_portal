"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { ProtectedShell } from "@/components/layout/protected-shell";
import { ErrorState, LoadingState, EmptyState } from "@/components/state/query-state";
import { Card } from "@/components/ui/card";
import { useSettings, useUpdateSettings } from "@/services/settings";
import type { Settings } from "@/types";
import { Pencil, Save } from "lucide-react";

const EMPTY_SETTINGS: Settings = { schoolName: "", academicYear: "", timezone: "" };

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export default function SettingsPage() {
  const { data: settings, isLoading, error } = useSettings();
  const updateSettings = useUpdateSettings();
  const [form, setForm] = useState<Settings>(EMPTY_SETTINGS);
  const [savedProfile, setSavedProfile] = useState<Settings | null>(null);
  const [isEditing, setIsEditing] = useState(true);
  const [dirty, setDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (settings) {
      setForm(settings);
      setSavedProfile(settings);
      setIsEditing(false);
      setDirty(false);
    }
  }, [settings]);

  function handleChange(key: keyof Settings, value: string) {
    setForm(f => ({ ...f, [key]: value }));
    setDirty(true);
  }

  function handleEdit() {
    setForm(savedProfile ?? settings ?? EMPTY_SETTINGS);
    setIsEditing(true);
    setDirty(false);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setIsSaving(true);
    try {
      const updatedSettings = await updateSettings.mutateAsync(form);
      setForm(updatedSettings);
      setSavedProfile(updatedSettings);
      setIsEditing(false);
      setDirty(false);
      toast.success("Settings saved");
    } catch (err: unknown) {
      toast.error(getErrorMessage(err, "Failed to save settings"));
    } finally {
      setIsSaving(false);
    }
  }

  const profile = savedProfile ?? settings;

  return (
    <ProtectedShell title="Settings">
      {isLoading ? (
        <LoadingState label="Loading settings..." />
      ) : error ? (
        <ErrorState error={error} />
      ) : profile || isEditing ? (
        <form onSubmit={handleSave}>
          <Card>
            <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-base font-black text-[#2e5a75]">School Configuration</h2>
              {!isEditing && (
                <button
                  type="button"
                  onClick={handleEdit}
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-5 py-2 text-sm font-bold text-[#2e5a75] shadow-sm transition hover:bg-slate-50"
                >
                  <Pencil className="h-4 w-4" />
                  Edit
                </button>
              )}
            </div>

            {isEditing ? (
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
            ) : (
              <div className="grid gap-4 md:grid-cols-3">
                {[
                  ["School Name", profile?.schoolName],
                  ["Academic Year", profile?.academicYear],
                  ["Timezone", profile?.timezone]
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <span className="mb-1 block text-xs font-bold uppercase text-slate-500">{label}</span>
                    <span className="block text-sm font-black text-slate-800">{value || "Not set"}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              {isEditing && (
                <button
                  type="submit"
                  disabled={!dirty || isSaving}
                  className="inline-flex items-center gap-2 rounded-full bg-[#2e5a75] px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-[#234762] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Save className="h-4 w-4" />
                  {isSaving ? "Saving..." : "Save Settings"}
                </button>
              )}
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
