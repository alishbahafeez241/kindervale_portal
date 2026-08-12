"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const data = [
  { name: "Mon", attendance: 94 },
  { name: "Tue", attendance: 91 },
  { name: "Wed", attendance: 97 },
  { name: "Thu", attendance: 93 },
  { name: "Fri", attendance: 96 }
];

export function AttendanceChart() {
  return (
    <div className="h-72">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" />
          <YAxis domain={[80, 100]} />
          <Tooltip />
          <Bar dataKey="attendance" fill="#2e5a75" radius={[6, 6, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
