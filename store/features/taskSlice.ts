import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Task {
  id: string;
  title: string;
  status: "todo" | "in-progress" | "done";
  priority: "high" | "medium" | "low";
  dueDate: string;
  finishedAt?: string;
  userId: string;
}

interface TaskState {
  list: Task[];
}

const initialState: TaskState = {
  list: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // read tasks from mock api
    setTasks(state, action: PayloadAction<Task[]>) {
      state.list = action.payload;
    },

    // add tasks
    addTask(state, action: PayloadAction<Task>) {
      state.list.push(action.payload);
    },

    // update tasks
    updateTask(state, action: PayloadAction<Task>) {
      const index = state.list.findIndex((t) => t.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },

    // delete tasks
    deleteTask(state, action: PayloadAction<string>) {
      state.list = state.list.filter((t) => t.id !== action.payload);
    },
  },
});

export const { setTasks, addTask, updateTask, deleteTask } = taskSlice.actions;
export default taskSlice.reducer;
