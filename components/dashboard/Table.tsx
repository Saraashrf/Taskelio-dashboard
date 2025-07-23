"use client";

import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import {
  updateTask,
  deleteTask,
  setTasks,
  Task,
} from "@/store/features/taskSlice";
import AddTaskModal from "./AddTask";

// import { Button } from "@/components/ui/button";
// import { Select } from "@/components/ui/select";

const pageSize = 4;

export default function TaskTable() {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);
  const tasks = useSelector((state: RootState) => state.tasks?.list ?? []);

  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"priority" | "dueDate">("dueDate");
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    const fetchTasks = async () => {
      if (!user?.id) return;
      const res = await fetch(`/api/tasks?userId=${user.id}`);
      const data = await res.json();
      dispatch(setTasks(data));
    };
    fetchTasks();
  }, [user?.id, dispatch]);

  const filteredTasks = useMemo(() => {
    let filtered = [...tasks];
    if (priorityFilter !== "all") {
      filtered = filtered.filter((task) => task.priority === priorityFilter);
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((task) => task.status === statusFilter);
    }
    if (sortBy === "dueDate") {
      filtered.sort(
        (a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      );
    } else {
      filtered.sort((a, b) => a.priority.localeCompare(b.priority));
    }
    return filtered;
  }, [tasks, priorityFilter, statusFilter, sortBy]);

  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="shadow-xl hover:shadow-xl transition-shadow duration-300 rounded-2xl h-4/7 bg-white dark:bg-gray-900  p-9 relative ">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl sm:text-3xl md:text-5xl font-semibold text-gray-800 dark:text-white mb-4 py-6">
          Last Tasks       
        </h2>
        <AddTaskModal />
      </div>

      <div className="flex justify-between items-center">
        {/* <Button>Add Task</Button> */}
        <div className="flex flex-col sm:flex-row gap-3  sm:gap-6 mb-6 sm:mb-4">
          <select
            className="bg-gray-300 py-2 px-4 rounded-2xl hover:bg-gray-200 focus:ring-gray-400"
            onChange={(e) => setPriorityFilter(e.target.value)}
            defaultValue="all"
          >
            <option value="all">All </option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>

          <select
            className="bg-gray-300 py-2 px-4 rounded-2xl hover:bg-gray-200 focus:ring-gray-400"
            onChange={(e) => setStatusFilter(e.target.value)}
            defaultValue="all"
          >
            <option value="all">All</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="done">Done</option>
          </select>

          <select
            className="bg-gray-300 py-2 px-4 rounded-2xl hover:bg-gray-200 focus:ring-gray-400"
            onChange={(e) =>
              setSortBy(e.target.value as "priority" | "dueDate")
            }
            defaultValue="dueDate"
          >
            <option value="dueDate">Sort by Due Date</option>
            <option value="priority">Sort by Priority</option>
          </select>
        </div>
      </div>

      <table className="min-w-full table-auto mb-1">
        <thead className="">
          <tr className="text-left text-base text-gray-400 py-2 border-y border-gray-300 font-semibold  ">
            <th className="py-2 w-1/3">Name</th>
            <th className="py-2 w-1/6">Priority</th>
            <th className="py-2 w-1/6 px-4 sm:px-0">Status</th>
            <th className="py-2 w-1/6">Due Date</th>
            <th className="py-2 text-right w-1/6"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedTasks.map((task: Task) => (
            <tr key={task.id} className=" text-base">
              <td className="py-3 from-neutral-800 text-sm sm:text-lg">
                {task.title}
              </td>
              <td className="py-3">
                <span
                  className={`px-4 py-2 text-sm font-medium rounded-full capitalize
      ${task.priority === "high" ? "bg-red-100 text-red-700" : ""}
      ${task.priority === "medium" ? "bg-yellow-100 text-yellow-700" : ""}
      ${task.priority === "low" ? "bg-green-100 text-green-700" : ""}
    `}
                >
                  {task.priority}
                </span>
              </td>
              <td className="py-3 px-4 sm:px-0">
                <select
                  disabled={task.status === "done"}
                  value={task.status}
                  onChange={(e) => {
                    const newStatus = e.target.value as Task["status"];

                    const updatedTask: Task = {
                      ...task,
                      status: newStatus,
                      finishedAt:
                        newStatus === "done" && !task.finishedAt
                          ? new Date().toISOString()
                          : task.finishedAt,
                    };

                    dispatch(updateTask(updatedTask));
                  }}
                  className={`capitalize text-sm px-1 sm:px-4 py-2 rounded-full font-medium
      ${task.status === "todo" ? "bg-gray-300 text-gray-700" : ""}
      ${task.status === "in-progress" ? "bg-yellow-300 text-yellow-700" : ""}
      ${task.status === "done" ? "bg-green-200 text-green-700" : ""}
    `}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </td>

              <td className="py-3">
                {new Date(task.dueDate).toLocaleDateString()}
              </td>
              <td className="py-2 text-right">
                <button
                  onClick={async () => {
                    try {
                      const res = await fetch(`/api/tasks?id=${task.id}`, {
                        method: "DELETE",
                      });

                      if (!res.ok) throw new Error("Failed to delete task");

                      dispatch(deleteTask(task.id)); // remove from Redux only after success
                    } catch (err) {
                      console.error("Delete failed:", err);
                    }
                  }}
                  className="text-gray-500 hover:text-red-600 transition-colors"
                  aria-label="Delete Task"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-end gap-2 mt-4 absolute right-9 bottom-6">
        {Array.from(
          { length: Math.ceil(filteredTasks.length / pageSize) },
          (_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === i + 1
                  ? "bg-black text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
}
