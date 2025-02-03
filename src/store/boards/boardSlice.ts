import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board } from "../../interfaces/types";

const DEFAULT_STATE = [
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

const initialState: Board[] = (() => {
  const persistanceState = localStorage.getItem("boards");
  if (persistanceState) {
    return JSON.parse(persistanceState).boards;
  }
  return DEFAULT_STATE;
})();

export const boardSlice = createSlice({
  name: "board",
  initialState,
  reducers: {
    addNewBoard: (state, action: PayloadAction<Board>) => {
      const id = crypto.randomUUID();
      return [...state, { ...action.payload, id }];
    },
    deleteBoardById: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      return state.filter((board) => board.id !== id);
    },
  },
});

export default boardSlice.reducer;

export const { addNewBoard,deleteBoardById } = boardSlice.actions;