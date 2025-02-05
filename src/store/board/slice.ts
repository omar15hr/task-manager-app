import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BoardWithId } from "../../interfaces/types";

const initialState: BoardWithId[] = [
  {
    id: "1",
    name: "Board 1",
    emoji: "🏢",
    color: "#768CE4",
    tasks: [
      {
        id: "task1",
        title: "Task 1",
        status: "In Progress",
        background: null,
        tags: [{ tag: "Front-end", color: "#768CE4", colorText: '#455285' }],
        columnId: "1",
      },
      {
        id: "task2",
        title: "Task 2",
        status: "In Review",
        background: null,
        tags: [
          { tag: "Back-end", color: "#FEEF49", colorText: '#7e7625' },
          { tag: "Front-end", color: "#768CE4", colorText: '#455285'}
        ],
        columnId: "1",
      },
      {
        id: "task3",
        title: "Task 3",
        status: "In Progress",
        background: null,
        tags: [{ tag: "Design", color: "#D784EA", colorText: '#71467a' }],
        columnId: "1",
      },
    ],
  },
  {
    id: "2",
    name: "Board 2",
    emoji: "🏢",
    color: "#768CE4",
    tasks: [
      {
        id: "task4",
        title: "Task 1",
        status: "In Progress",
        background: null,
        tags: [{ tag: "Front-end", color: "#768CE4", colorText: '#455285' }],
        columnId: "2",
      },
      {
        id: "task5",
        title: "Task 2",
        status: "In Review",
        background: null,
        tags: [
          { tag: "Back-end", color: "#FEEF49", colorText: '#7e7625' },
          { tag: "Front-end", color: "#768CE4", colorText: '#455285'}
        ],
        columnId: "2",
      },
    ],
  }
];

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    addBoard: (state, action: PayloadAction<BoardWithId>) => {
      state.push(action.payload);
    },
  },
});

export default boardSlice.reducer;