import { useDispatch } from "react-redux";
import { Board, BoardId, BoardWithId, TaskWithId } from "../interfaces/types";
import { addNewBoard, addNewTask, deleteBoardById, updateBoardById } from "../store/board/slice";

export function useBoardActions() {
  const dispatch = useDispatch();

  const addBoard = (board: Board) => {
    dispatch(addNewBoard(board));
  };

  const deleteBoard = (boardId: BoardId) => {
    dispatch(deleteBoardById(boardId));
  }

  const updateBoard = (board: BoardWithId) => {
    dispatch(updateBoardById(board));
  };

  const addTask = (task: TaskWithId) => {
    dispatch(addNewTask({ task }));
  };

  return {
    addBoard,
    deleteBoard,
    updateBoard,
    addTask,
  };
}