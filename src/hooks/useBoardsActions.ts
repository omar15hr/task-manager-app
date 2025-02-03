import { Board, BoardId } from "../interfaces/types";
import { addNewBoard, deleteBoardById } from "../store/boards/boardSlice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addBoard = (board: Board) => {
    dispatch(addNewBoard(board));
  };

  const removeBoard = (id: BoardId) => {
    dispatch(deleteBoardById(id));
  };

  return { addBoard, removeBoard };
};
