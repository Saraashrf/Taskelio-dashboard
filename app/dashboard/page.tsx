"use client";
import Sidebar from "@/components/dashboard/Sidebar";

import TaskTable from "@/components/dashboard/Table";
import LineChartComponent from "@/components/dashboard/LineChartComponent";
import PieChartComponent from "@/components/dashboard/PieChartComponent";
import { RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardPage() {
  const user = useSelector((state: RootState) => state.auth.user);
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, [user, router]);

  if (!user) return null;
  return (
    <div className="flex flex-col sm:flex-row min-h-screen bg-gray-300 px-6 py-6">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}

      <main className="px:2 sm:px-6 flex-1 flex flex-col space-y-6 overflow-x-auto ">
        {/* Task Table */}

        <TaskTable />

        {/* Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
          <LineChartComponent />

          <PieChartComponent />
        </div>
      </main>
    </div>
  );
}
