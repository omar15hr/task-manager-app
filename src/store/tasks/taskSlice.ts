import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardData, Task, TaskId } from "../../interfaces/types";

const DEFAULT_STATE: BoardData[] = [
  {
    id: '1',
    tasks: [
      { id: '1', title: "Investigate Framer-Motion for animations.", status: "backlog", background: null, tags: ["concept"] },
      { id: '2', title: "Implement CRUD operations", status: "backlog", background: "image-url", tags: ["technical"] },
    ],
  },
  {
    id: '2',
    tasks: [
      { id: '3', title: "Design new UI", status: "in-progress", background: null, tags: ["design"] },
    ],
  },
];

const initialState: BoardData[] = (() => {
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
    addNewTask: (state, action: PayloadAction<{ boardId: string, task: Task }>) => {
      const { boardId, task } = action.payload;
      const board = state.find((b) => b.id === boardId);
      if (board) {
        const id = crypto.randomUUID();
        board.tasks.push({ ...task, id });
      }
      return state;
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