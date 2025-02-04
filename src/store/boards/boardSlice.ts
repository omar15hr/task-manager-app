import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Board, BoardId, BoardWithId, Task, TaskId } from "../../interfaces/types";

const DEFAULT_STATE: BoardWithId[] = [];

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
      return [...state, { ...action.payload, id, tasks: [] }];
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

    addNewTaskToBoard: (
      state,
      action: PayloadAction<{ boardId: BoardId; task: Task }>
    ) => {
      const { boardId, task } = action.payload;
      return state.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: [...board.tasks, { ...task, id: crypto.randomUUID() }],
          };
        }
        return board;
      });
    },

    deleteTaskFromBoard: (
      state,
      action: PayloadAction<{ boardId: BoardId; taskId: TaskId }>
    ) => {
      const { boardId, taskId } = action.payload;
      return state.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.filter((task) => task.id !== taskId),
          };
        }
        return board;
      });
    },

    updateTaskInBoard: (
      state,
      action: PayloadAction<{
        boardId: BoardId;
        taskId: TaskId;
        updatedTask: Partial<Task>;
      }>
    ) => {
      const { boardId, taskId, updatedTask } = action.payload;
      return state.map((board) => {
        if (board.id === boardId) {
          return {
            ...board,
            tasks: board.tasks.map((task) => {
              if (task.id === taskId) {
                return { ...task, ...updatedTask };
              }
              return task;
            }),
          };
        }
        return board;
      });
    },

    updateTaskOrderInBoard: (
      state,
      action: PayloadAction<{ boardId: BoardId; tasks: Task[] }>
    ) => {
      const { boardId, tasks } = action.payload;
      return state.map((board) => {
        if (board.id === boardId) {
          return { ...board, tasks };
        }
        return board;
      });
    },
  },
});

export default boardSlice.reducer;

export const {
  addNewBoard,
  deleteBoardById,
  updateBoardById,
  updateBoardsOrder,
  addNewTaskToBoard,
  deleteTaskFromBoard,
  updateTaskInBoard,
  updateTaskOrderInBoard,
} = boardSlice.actions;
