import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../interfaces/types";

const initialState: Board[] = [
  {
    id: '1',
    name: "Default Board",
    emoji: "🛠️",
    color: "#F8D8B0",
    tasks: [
      { id: '1', title: "Default Task", status: "Backlog", background: '#F8D8B0', tags: ["technical", "front-end"] },
    ],
  }
];

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    deleteBoardById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((board) => board.id !== id);
    },
  },
});

export default boardSlice.reducer;

export const { deleteBoardById } = boardSlice.actions;