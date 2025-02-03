import { Board } from "../interfaces/types";
import { addNewBoard, deleteBoardById } from "../store/boards/boardSlice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addBoard = (board: Board) => {
    dispatch(addNewBoard(board));
  };

  const removeBoard = (id: string) => {
    dispatch(deleteBoardById(id));
  };

  return { addBoard, removeBoard };
};
