import { useDispatch } from "react-redux";
import { Board, BoardId, BoardWithId } from "../interfaces/types";
import { addNewBoard, deleteBoardById, updateBoardById } from "../store/board/slice";

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

  return {
    addBoard,
    deleteBoard,
    updateBoard,
  };
}