import { NextRequest, NextResponse } from "next/server";

interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  dueDate?: string; // ISO string format
  priority: "low" | "medium" | "high";
  userId: string;
  finishedAt?: string;
}

let tasks: Task[] = [
  {
    id: "1",
    title: "Finish dashboard",
    status: "in-progress",
    dueDate: "2025-07-25",
    priority: "high",
    userId: "u1",
    finishedAt: "2025-07-3",
  },
  {
    id: "2",
    title: "Write documentation",
    status: "todo",
    dueDate: "2025-07-28",
    priority: "medium",
    userId: "u2",
    finishedAt: "2025-07-14",
  },
  {
    id: "3",
    title: "Fix login bug",
    status: "done",
    dueDate: "2025-07-20",
    priority: "high",
    userId: "u1",
    finishedAt: "2025-07-18",
  },
  {
    id: "4",
    title: "Learn TypeScript",
    status: "done",
    dueDate: "2025-07-23",
    priority: "high",
    userId: "u2",
    finishedAt: "2025-07-21",
  },
  {
    id: "5",
    title: "Fix login bug",
    status: "done",
    dueDate: "2025-07-20",
    priority: "high",
    userId: "u1",
    finishedAt: "2025-07-29",
  },
  {
    id: "6",
    title: "Learn TypeScript",
    status: "done",
    dueDate: "2025-07-23",
    priority: "high",
    userId: "u2",
    finishedAt: "2025-08-1",
  },
  {
    id: "7",
    title: "Fix login bug",
    status: "done",
    dueDate: "2025-07-20",
    priority: "high",
    userId: "u1",
    finishedAt: "2025-07-18",
  },
  {
    id: "8",
    title: "Learn TypeScript",
    status: "done",
    dueDate: "2025-07-23",
    priority: "high",
    userId: "u2",
    finishedAt: "2025-07-21",
  },
  {
    id: "9",
    title: "Fix login bug",
    status: "done",
    dueDate: "2025-07-20",
    priority: "high",
    userId: "u1",
    finishedAt: "2025-07-18",
  },
  {
    id: "10",
    title: "Learn TypeScript",
    status: "done",
    dueDate: "2025-07-23",
    priority: "high",
    userId: "u2",
    finishedAt: "2025-07-21",
  },
];

// GET: fetch all tasks for a user
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get("userId");

  if (!userId) {
    return NextResponse.json({ error: "Missing userId" }, { status: 400 });
  }

  const userTasks = tasks.filter((task) => task.userId === userId);
  return NextResponse.json(userTasks);
}

// POST: add a new task
export async function POST(req: Request) {
  const newTask: Task = await req.json();
  tasks.push(newTask);
  return NextResponse.json({ success: true });
}

//  Put: update an existing task
export async function PUT(req: Request) {
  const updatedTask = await req.json();
  const index = tasks.findIndex((task) => task.id === updatedTask.id);

  if (index === -1) {
    return NextResponse.json({ error: "Task not found" }, { status: 404 });
  }

  tasks[index] = updatedTask;
  return NextResponse.json({ success: true });
}

// DELETE: delete an existing task
export async function DELETE(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "Missing task id" }, { status: 400 });
  }

  tasks = tasks.filter((task) => task.id !== id);
  return NextResponse.json({ success: true });
}
