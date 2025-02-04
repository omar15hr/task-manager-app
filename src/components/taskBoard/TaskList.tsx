import { BoardData } from "../../interfaces/types";

interface TaskListProps {
  boardId: string | null;
  tasks: BoardData[];
}

export function TaskList({ boardId, tasks }: TaskListProps) {
  if (!boardId) return <p>Selecciona un board para ver sus tareas</p>;

  const boardTasks = tasks.find((task) => task.id === boardId)?.tasks || [];

  return (
    <div className="bg-gray-100 p-4 rounded-md w-80">
      {boardTasks.length > 0 ? (
        boardTasks.map((task) => (
          <div key={task.id} className="p-2 bg-white rounded shadow mb-2 text-black">
            {task.title}
          </div>
        ))
      ) : (
        <p className="text-black">No hay tareas</p>
      )}
    </div>
  );
}