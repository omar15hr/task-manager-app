import { Board, BoardId } from "../interfaces/types";
import { addNewBoard, deleteBoardById, updateBoardById } from "../store/boards/boardSlice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addBoard = (board: Board) => {
    dispatch(addNewBoard(board));
  };

  const removeBoard = (id: BoardId) => {
    dispatch(deleteBoardById(id));
  };

  const updatedBoard = (id: BoardId, updatedBoard: Partial<Board>) => {
    dispatch(updateBoardById({ id, updatedBoard }));
  };

  return { addBoard, removeBoard, updatedBoard };
};
