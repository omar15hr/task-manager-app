import { Task } from "../interfaces/types";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div className="text-black bg-white ">{task.title}</div>
  );
}