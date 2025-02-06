import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  Board,
  BoardId,
  BoardWithId,
  TaskWithId,
} from "../../interfaces/types";

const initialState: BoardWithId[] = [];

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    // BOARD
    addNewBoard: (state, action: PayloadAction<Board>) => {
      const id = crypto.randomUUID();
      state.push({ ...action.payload, id });
    },
    deleteBoardById: (state, action: PayloadAction<BoardId>) => {
      const id = action.payload;
      return state.filter((board) => board.id !== id);
    },
    updateBoardById: (state, action: PayloadAction<BoardWithId>) => {
      const boardWithId = action.payload;
      const index = state.findIndex((board) => board.id === boardWithId.id);
      state[index] = action.payload;
    },
    // TASK
    addNewTask: (
      state,
      action: PayloadAction<{ task: TaskWithId}>
    ) => {
      const { task } = action.payload;
      const boardId = task.columnId;
      const board = state.find((board) => board.id === boardId);
      if (!board) return;

      board.tasks.push(task);
      return state;
    },
  },
});

export default boardSlice.reducer;
export const { addNewBoard, deleteBoardById, updateBoardById, addNewTask } =
  boardSlice.actions;
