import { Board, BoardId, BoardWithId } from "../interfaces/types";
import { addNewBoard, deleteBoardById, updateBoardById, updateBoardsOrder } from "../store/boards/boardSlice";
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

  const updatedOrder = (boards: BoardWithId[]) => {
    dispatch(updateBoardsOrder(boards));
  };

  return { addBoard, removeBoard, updatedBoard, updatedOrder };
};
