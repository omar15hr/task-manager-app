import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardId, BoardWithId } from "../../interfaces/types";

const DEFAULT_STATE: BoardWithId[] = [
    { id: '1', name: "Development", emoji: "../../assets/emojis/board-logo-13.png", color: "#ff5733", tasks: [] },
    { id: '2', name: "Design", emoji: "../../assets/emojis/board-logo-10.png", color: "#ff5733", tasks: [] },
    { id: '3', name: "Product", emoji: "../../assets/emojis/board-logo-1.png", color: "#ff5733", tasks: [] },
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
    updateBoardsOrder: (state, action: PayloadAction<BoardWithId[]>) => {
      return action.payload;
    },
  },
});

export default boardSlice.reducer;

export const { addNewBoard, deleteBoardById, updateBoardById, updateBoardsOrder } =
  boardSlice.actions;
