"use client";

import { useState } from "react";
import { X, Download, GraduationCap, UserCheck, ShieldCheck } from "lucide-react";
import type { Student } from "@/types";
import { initials, prettyDate } from "@/utils/format";
import toast from "react-hot-toast";

interface StudentIdCardModalProps {
  student: Student;
  isOpen: boolean;
  onClose: () => void;
}

export function StudentIdCardModal({ student, isOpen, onClose }: StudentIdCardModalProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  if (!isOpen) return null;

  const downloadPdf = async () => {
    setIsGenerating(true);
    toast.loading("Preparing PDF ID Card...", { id: "id-card-pdf" });

    try {
      const { jsPDF } = await import("jspdf");
      const doc = new jsPDF({ unit: "mm", format: "a4" });

      const pageW = 210;
      const pageH = 297;
      const cardW = 95;
      const cardH = 140;
      const x0 = (pageW - cardW) / 2;
      const y0 = (pageH - cardH) / 2;

      // Card Background
      doc.setFillColor(255, 255, 255);
      doc.roundedRect(x0, y0, cardW, cardH, 4, 4, "F");
      doc.setDrawColor(220, 226, 235);
      doc.roundedRect(x0, y0, cardW, cardH, 4, 4, "S");

      // Header Banner
      doc.setFillColor(46, 90, 117);
      doc.roundedRect(x0, y0, cardW, 22, 4, 4, "F");
      doc.rect(x0, y0 + 10, cardW, 12, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(12);
      doc.text("KINDERVALE PRESCHOOL", x0 + cardW / 2, y0 + 9, { align: "center" });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7);
      doc.setTextColor(246, 180, 30);
      doc.text("STUDENT IDENTIFICATION", x0 + cardW / 2, y0 + 16, { align: "center" });

      // Initials Avatar Circle
      const cx = x0 + cardW / 2;
      const cy = y0 + 38;
      doc.setFillColor(234, 244, 251);
      doc.circle(cx, cy, 11, "F");
      doc.setTextColor(46, 90, 117);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.text(initials(student.name), cx, cy + 2, { align: "center" });

      // Name & Class
      doc.setTextColor(31, 66, 87);
      doc.setFontSize(13);
      doc.text(student.name, cx, y0 + 58, { align: "center" });
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(139, 147, 167);
      doc.text(`${student.className} · Section A`, cx, y0 + 64, { align: "center" });

      // Details Table
      const rows = [
        ["Admission No", student.id],
        ["Date of Birth", student.birthday ? prettyDate(student.birthday) : "—"],
        ["Attendance", `${student.attendance}%`],
        ["Guardian", student.parentName || "—"],
        ["Contact", student.phone || "—"],
        ["Issued", new Date().toLocaleDateString()]
      ];

      let ry = y0 + 74;
      doc.setFontSize(8);
      rows.forEach((r) => {
        doc.setTextColor(139, 147, 167);
        doc.setFont("helvetica", "normal");
        doc.text(r[0], x0 + 6, ry);
        doc.setTextColor(63, 70, 87);
        doc.setFont("helvetica", "bold");
        doc.text(String(r[1]), x0 + cardW - 6, ry, { align: "right" });
        ry += 7;
      });

      // Footer Yellow Strip
      doc.setFillColor(246, 180, 30);
      doc.rect(x0, y0 + cardH - 12, cardW, 12, "F");
      doc.setTextColor(31, 66, 87);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text("VALID FOR ACADEMIC YEAR · KINDERVALE PRESCHOOL", x0 + cardW / 2, y0 + cardH - 4, {
        align: "center"
      });

      const fileName = `Student_ID_Card_${student.name.replace(/\s+/g, "_")}_${student.id}.pdf`;
      doc.save(fileName);
      toast.success("Student ID Card downloaded successfully!", { id: "id-card-pdf" });
    } catch (err) {
      console.error("Failed to generate PDF:", err);
      toast.error("Could not generate PDF card. Please try again.", { id: "id-card-pdf" });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm">
      <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white p-6 shadow-2xl border border-slate-100">
        <button
          onClick={onClose}
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="mb-4 text-center">
          <h3 className="text-xl font-black text-[#2e5a75]">Student ID Card</h3>
          <p className="text-xs text-slate-500">Official Kindervale Preschool Identification</p>
        </div>

        {/* Visual Preview Card */}
        <div className="mx-auto max-w-[320px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
          <div className="bg-[#2e5a75] py-4 text-center text-white">
            <div className="flex justify-center items-center gap-2">
              <GraduationCap className="h-5 w-5 text-[#f6b41e]" />
              <span className="text-sm font-black tracking-wider">KINDERVALE PRESCHOOL</span>
            </div>
            <div className="mt-0.5 text-[9px] font-bold tracking-[0.25em] text-[#f6b41e]">
              STUDENT IDENTIFICATION
            </div>
          </div>

          <div className="p-5 text-center">
            <div className="mx-auto mb-3 flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-[#2e5a75] to-[#f6b41e] text-xl font-black text-white shadow-md">
              {initials(student.name)}
            </div>
            <div className="text-lg font-bold text-[#1f4257]">{student.name}</div>
            <div className="text-xs font-semibold text-slate-400">{student.className} · Section A</div>

            <div className="mt-4 space-y-1.5 border-t border-slate-100 pt-3 text-left text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Admission No:</span>
                <span className="font-bold text-slate-700">{student.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="font-bold text-slate-700">
                  {student.birthday ? prettyDate(student.birthday) : "—"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Attendance Rate:</span>
                <span className="font-bold text-teal-600">{student.attendance}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Guardian:</span>
                <span className="font-bold text-slate-700">{student.parentName || "—"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact:</span>
                <span className="font-bold text-slate-700">{student.phone || "—"}</span>
              </div>
            </div>
          </div>

          <div className="bg-[#f6b41e] py-2 text-center text-[10px] font-black text-[#1f4257] tracking-wider">
            VALID FOR ACADEMIC YEAR 2026-2027
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <button
            onClick={downloadPdf}
            disabled={isGenerating}
            className="inline-flex items-center gap-2 rounded-full bg-[#f6b41e] px-6 py-2.5 text-sm font-black text-[#1f4257] shadow-lg transition hover:bg-[#e0a00c] disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isGenerating ? "Generating PDF..." : "Download PDF ID Card"}
          </button>
        </div>
      </div>
    </div>
  );
}
