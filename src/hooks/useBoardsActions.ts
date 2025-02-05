import { Board, BoardId, BoardWithId, Task } from "../interfaces/types";
import { addNewBoard, addNewTaskToBoard, deleteBoardById, updateBoardById, updateBoardsOrder, updateTaskOrderInBoard } from "../store/boards/boardSlice";
import { useAppDispatch } from "./store";

export const useBoardsActions = () => {
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

  // TASK
  const updatedOrderTask = (boardId: BoardId, tasks: Task[]) => {
    dispatch(updateTaskOrderInBoard({ boardId, tasks }));
  };

  const addTaskToBoard = (boardId: BoardId, task: Task) => {
    dispatch(addNewTaskToBoard({ boardId, task }));
  };

  return { addBoard, removeBoard, updatedBoard, updatedOrder, addTaskToBoard, updatedOrderTask };
};
