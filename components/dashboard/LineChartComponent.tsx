"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { Task } from "@/store/features/taskSlice";

// Helper: Get ISO Week Number Label (e.g., "Week 27")
const getWeekLabel = (dateStr: string) => {
  const date = new Date(dateStr);
  const firstDayOfYear = new Date(date.getFullYear(), 0, 1);
  const pastDaysOfYear = Math.floor(
    (date.getTime() - firstDayOfYear.getTime()) / 86400000
  );
  const weekNumber = Math.ceil(
    (pastDaysOfYear + firstDayOfYear.getDay() + 1) / 7
  );
  return `Week ${weekNumber}`;
};

export default function LineChartComponent() {
  const tasks = useSelector((state: RootState) => state.tasks.list);

  // Filter only completed tasks with finishedAt
  const completedTasks = tasks.filter(
    (task) => task.status === "done" && task.finishedAt
  );

  // Group by week number
  const weeklyCounts: { [key: string]: number } = {};
  completedTasks.forEach((task) => {
    const week = getWeekLabel(task.finishedAt!);
    weeklyCounts[week] = (weeklyCounts[week] || 0) + 1;
  });

  // Convert to array and sort by week number
  const chartData = Object.entries(weeklyCounts)
    .map(([week, completed]) => ({
      week,
      completed,
      weekNum: Number(week.split(" ")[1]), // extract number for sorting
    }))
    .sort((a, b) => a.weekNum - b.weekNum);

  return (
    <div className=" bg-white shadow-xl hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 w-full ">
      <h2 className="text-xl font-semibold mb-4">Tasks Completed Per Week</h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
          <XAxis
            dataKey="week"
            stroke="#A0AEC0"
            tick={{ fill: "#4A5568", fontSize: 12 }}
          />
          <YAxis
            allowDecimals={false}
            stroke="#A0AEC0"
            tick={{ fill: "#4A5568", fontSize: 12 }}
          />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="completed"
            stroke="#6495ED"
            strokeWidth={4}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
