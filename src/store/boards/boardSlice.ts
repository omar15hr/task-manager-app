import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardId, BoardWithId } from "../../interfaces/types";

const DEFAULT_STATE: {
  boards: BoardWithId[];
  selectedBoardId: BoardId | null;
} = {
  boards: [
    {
      id: "1",
      name: "Development",
      emoji: "💻",
      color: "#ff5733",
      tasks: [],
    },
  ],
  selectedBoardId: "1",
};

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
    updateBoardById: (
      state,
      action: PayloadAction<{ id: BoardId; updatedBoard: Partial<Board> }>
    ) => {
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

export const { addNewBoard, deleteBoardById, updateBoardById } =
  boardSlice.actions;
