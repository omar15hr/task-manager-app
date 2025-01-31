import { createSlice } from "@reduxjs/toolkit";
import { Board } from "../../interfaces/types";


const initialState: Board[] = [];


export const boardsSlice = createSlice({
  name: "boards",
  initialState,
  reducers: {
    setBoards: (_, action) => {
      return action.payload;
    },
    
  },
});

export const { setBoards } = boardsSlice.actions;

export default boardsSlice.reducer;
