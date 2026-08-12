import type { ClassRoom, Exam, Fee, Notification, Parent, Settings, Student, Teacher, User } from "@/types";

export const users: User[] = [
  { id: "u-admin", name: "Amina Khan", username: "admin", email: "admin@kindervale.edu", role: "admin" },
  { id: "u-daycare", name: "Dina Care", username: "daycare", email: "daycare@kindervale.edu", role: "daycare_admin" },
  { id: "u-principal", name: "Sara Principal", username: "principal", email: "principal@kindervale.edu", role: "principal" },
  { id: "u-teacher", name: "Maya Teacher", username: "teacher", email: "teacher@kindervale.edu", role: "teacher", homeroom: "Nursery A" },
  { id: "u-parent", name: "Omar Parent", username: "parent", email: "parent@kindervale.edu", role: "parent", linkedStudentIds: ["S-1001", "S-1003"] }
];

export const students: Student[] = [
  { id: "S-1001", name: "Lina Omar", className: "Nursery A", age: 4, birthday: "2022-04-12", attendance: 96, parentName: "Omar Parent", phone: "+1 555 0101", feeStatus: "Paid" },
  { id: "S-1002", name: "Noah Ali", className: "KG 1", age: 5, birthday: "2021-09-03", attendance: 92, parentName: "Hina Ali", phone: "+1 555 0102", feeStatus: "Pending" },
  { id: "S-1003", name: "Zara Omar", className: "Playgroup", age: 3, birthday: "2023-01-28", attendance: 89, parentName: "Omar Parent", phone: "+1 555 0101", feeStatus: "Partial" },
  { id: "S-1004", name: "Rayyan Shah", className: "KG 2", age: 6, birthday: "2020-07-19", attendance: 98, parentName: "Sana Shah", phone: "+1 555 0104", feeStatus: "Paid" }
];

export const teachers: Teacher[] = [
  { id: "T-01", name: "Maya Teacher", email: "teacher@kindervale.edu", phone: "+1 555 0201", subject: "Early Years", className: "Nursery A", attendance: "Present" },
  { id: "T-02", name: "Bilal Ahmed", email: "bilal@kindervale.edu", phone: "+1 555 0202", subject: "Phonics", className: "KG 1", attendance: "Present" },
  { id: "T-03", name: "Nadia Noor", email: "nadia@kindervale.edu", phone: "+1 555 0203", subject: "Creative Arts", className: "KG 2", attendance: "Late" }
];

export const parents: Parent[] = [
  { id: "P-01", name: "Omar Parent", email: "parent@kindervale.edu", phone: "+1 555 0101", studentIds: ["S-1001", "S-1003"] },
  { id: "P-02", name: "Hina Ali", email: "hina@example.com", phone: "+1 555 0102", studentIds: ["S-1002"] }
];

export const classes: ClassRoom[] = [
  { id: "C-01", name: "Playgroup", teacher: "Nadia Noor", capacity: 18 },
  { id: "C-02", name: "Nursery A", teacher: "Maya Teacher", capacity: 20 },
  { id: "C-03", name: "KG 1", teacher: "Bilal Ahmed", capacity: 22 },
  { id: "C-04", name: "KG 2", teacher: "Nadia Noor", capacity: 22 }
];

export const fees: Fee[] = [
  { id: "F-01", invoice: "KV-2026-001", studentId: "S-1001", amount: 450, dueDate: "2026-08-05", status: "Paid" },
  { id: "F-02", invoice: "KV-2026-002", studentId: "S-1002", amount: 450, dueDate: "2026-08-05", status: "Pending" },
  { id: "F-03", invoice: "KV-2026-003", studentId: "S-1003", amount: 380, dueDate: "2026-08-05", status: "Partial" }
];

export const exams: Exam[] = [
  { id: "E-01", title: "Term Readiness Review", subject: "Early Years", className: "Nursery A", date: "2026-09-18", maxMarks: 50 },
  { id: "E-02", title: "Phonics Check", subject: "Language", className: "KG 1", date: "2026-09-22", maxMarks: 30 }
];

export const notifications: Notification[] = [
  { id: "N-01", title: "Parent orientation", body: "Orientation is scheduled for Friday morning.", date: "2026-08-02", audience: "ALL" },
  { id: "N-02", title: "Weekly objectives approved", body: "Nursery weekly objectives are visible to parents.", date: "2026-07-25", audience: "TEACHER" }
];

export const settings: Settings = {
  schoolName: "Kindervale Preschool",
  academicYear: "2026-2027",
  timezone: "America/Los_Angeles"
};
