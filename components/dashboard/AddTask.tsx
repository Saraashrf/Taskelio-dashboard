"use client";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask, Task } from "@/store/features/taskSlice";
import { RootState } from "@/store";

export default function AddTaskModal() {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("medium");
  const [dueDate, setDueDate] = useState("");
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.auth.user);

  const handleAdd = async () => {
    if (!title || !dueDate || !user?.id) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title,
      status: "todo",
      priority,
      dueDate,
      userId: user.id,
    };

    try {
      const res = await fetch("/api/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...newTask }), // include userId!
      });

      if (!res.ok) throw new Error("Failed to save task");

      dispatch(addTask(newTask)); // Redux
      setOpen(false); // Close modal
      setTitle("");
      setDueDate("");
      setPriority("medium");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-black text-lg  text-white px-7 py-2 sm:px-8 sm:py-3 rounded-xl hover:bg-gray-700"
      >
        Add Task
      </button>

      {open && (
        <div className="fixed inset-0 bg-[rgba(0,0,0,0.3)] flex items-start justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-100  space-y-4 shadow-lg mt-8 ">
            <h2 className="text-2xl font-semibold mb-4">New Task</h2>

            <label>Task Title</label>

            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <label>Due date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            />
            <label>Task Priority</label>

            <select
              value={priority}
              onChange={(e) =>
                setPriority(e.target.value as "low" | "medium" | "high")
              }
              className="w-full px-3 py-2 border rounded"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>

            <div className="flex justify-end gap-4 mt-4">
              <button
                onClick={() => setOpen(false)}
                className="text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                className="bg-black hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
