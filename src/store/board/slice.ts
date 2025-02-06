import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardWithId } from "../../interfaces/types";

const initialState: BoardWithId[] = [
  {
    id: "1",
    name: "Board 1",
    emoji: "/src/assets/emojis/board-logo-01.png",
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
    emoji: "/src/assets/emojis/board-logo-02.png",
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
    addNewBoard: (state, action: PayloadAction<Board>) => {
      const id = crypto.randomUUID();
      state.push({ ...action.payload, id });
    },
  },
});

export default boardSlice.reducer;
export const { addNewBoard } = boardSlice.actions;