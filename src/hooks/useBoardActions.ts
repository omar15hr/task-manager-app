import { useDispatch } from "react-redux";
import { Board } from "../interfaces/types";
import { addNewBoard } from "../store/board/slice";

export function useBoardActions() {
  const dispatch = useDispatch();

  const addBoard = (board: Board) => {
    dispatch(addNewBoard(board));
  };

  return {
    addBoard,
  };
}