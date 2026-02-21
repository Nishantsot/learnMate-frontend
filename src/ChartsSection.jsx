import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";

export default function ChartsSection({ stats }) {

  const revenueData = (stats.monthlyRevenue || []).map(m => ({
    month: "M" + m[0],
    revenue: m[1],
  }));

  const topTutorsData = (stats.topTutors || []).map(t => ({
    name: t[0],
    earnings: t[1],
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-10">
      
      {/* Monthly Revenue */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Monthly Revenue</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={revenueData}>
            <XAxis dataKey="month" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Bar dataKey="revenue" fill="#3b82f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Top Tutors */}
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="text-xl font-bold mb-4">Top Tutors</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={topTutorsData}>
            <XAxis dataKey="name" stroke="#bbb" />
            <YAxis stroke="#bbb" />
            <Tooltip />
            <Line dataKey="earnings" stroke="#10b981" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}
