import { Task, TaskId } from "../interfaces/types";
import { addNewTask, deleteTaskById, updateTaskById, updateTaskNewOrder } from "../store/tasks/taskSlice";
import { useAppDispatch } from "./store";

export const useTasksActions = () => {
  const dispatch = useAppDispatch();

  const addTask = (boardId: string, task: Task) => {
    dispatch(addNewTask({ boardId, task }));
  };  

  const removeTask = (id: TaskId) => {
    dispatch(deleteTaskById(id));
  };

  const updatedTask = (id: TaskId, updatedBoard: Partial<Task>) => {
    dispatch(updateTaskById({ id, updatedTask: updatedBoard }));
  };

  const updateOrder = (boardId: string, tasks: Task[]) => {
    dispatch(updateTaskNewOrder({ boardId, tasks }));
  };
  

  return { addTask, removeTask, updatedTask, updateOrder };
};
