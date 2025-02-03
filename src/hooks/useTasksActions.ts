import { Task, TaskId } from "../interfaces/types";
import { addNewTask, deleteTaskById, updateTaskById } from "../store/tasks/taskSlice";
import { useAppDispatch } from "./store";

export const useUserActions = () => {
  const dispatch = useAppDispatch();

  const addTask = (board: Task) => {
    dispatch(addNewTask(board));
  };

  const removeTask = (id: TaskId) => {
    dispatch(deleteTaskById(id));
  };

  const updatedTask = (id: TaskId, updatedBoard: Partial<Task>) => {
    dispatch(updateTaskById({ id, updatedTask: updatedBoard }));
  };

  return { addTask, removeTask, updatedTask };
};
