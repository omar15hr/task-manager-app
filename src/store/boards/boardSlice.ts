import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardId, BoardWithId } from "../../interfaces/types";

const DEFAULT_STATE = [
  {
    id: '1',
    name: "Default Board",
    emoji: "../../assets/emojis/board-logo-01.png",
    color: "#F8D8B0",
    tasks: [
      { id: '1', title: "Default Task", status: "Backlog", background: '#F8D8B0', tags: ["technical", "front-end"] },
    ],
  }
];

const initialState: BoardWithId[] = (() => {
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
    deleteBoardById: (state, action: PayloadAction<BoardId>) => {
      const id = action.payload;
      return state.filter((board) => board.id !== id);
    },
    updateBoardById: (state, action: PayloadAction<{ id: BoardId, updatedBoard: Partial<Board> }>) => {
      const { id, updatedBoard } = action.payload;
      return state.map((board) => {
        if (board.id === id) {
          return { ...board, ...updatedBoard };
        }
        return board;
      });
    },
  },
});

export default boardSlice.reducer;

export const { addNewBoard,deleteBoardById, updateBoardById } = boardSlice.actions;