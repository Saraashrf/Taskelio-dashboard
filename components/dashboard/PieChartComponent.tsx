"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Task } from "@/store/features/taskSlice";

// Define custom colors for each status
const STATUS_COLORS: { [key in Task["status"]]: string } = {
  todo: "#A0AEC0", // Gray
  "in-progress": "#F6AD51", // Orange
  done: "#48BB78", // Green
};

export default function PieChartComponent() {
  const tasks = useSelector((state: RootState) => state.tasks.list);

  // Count tasks by status
  const statusCounts: { [key in Task["status"]]?: number } = {};
  tasks.forEach((task) => {
    statusCounts[task.status] = (statusCounts[task.status] || 0) + 1;
  });

  // Transform into chart data
  const chartData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  return (
    <div className="bg-white shadow-xl hover:shadow-xl transition-shadow duration-300 rounded-2xl p-6 w-full">
      <h2 className="text-xl font-semibold mb-4">Task Status Distribution</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            label={({ name, percent }) =>
              `${name} (${
                percent !== undefined ? (percent * 100).toFixed(0) : "0"
              }%)`
            }
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={STATUS_COLORS[entry.name as Task["status"]]}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
