import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TaskId, TaskWithId } from "../../interfaces/types";

const DEFAULT_STATE = [
  {
    id: '1',
    title: "Default Task",
    status: "Backlog",
    background: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
    tags: ["technical", "front-end"],
  
  },
];

const initialState: TaskWithId[] = (() => {
  const persistanceState = localStorage.getItem("tasks");
  if (persistanceState) {
    return JSON.parse(persistanceState).tasks;
  }
  return DEFAULT_STATE;
})();

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addNewTask: (state, action: PayloadAction<Task>) => {
      const id = crypto.randomUUID();
      return [...state, { ...action.payload, id }];
    },
    deleteTaskById: (state, action: PayloadAction<TaskId>) => {
      const id = action.payload;
      return state.filter((task) => task.id !== id);
    },
    updateTaskById: (state, action: PayloadAction<{ id: TaskId, updatedTask: Partial<Task> }>) => {
      const { id, updatedTask } = action.payload;
      return state.map((task) => {
        if (task.id === id) {
          return { ...task, ...updatedTask };
        }
        return task;
      });
    },
  },
});

export default taskSlice.reducer;

export const { addNewTask,deleteTaskById, updateTaskById } = taskSlice.actions;