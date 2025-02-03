import { Task } from "../../interfaces/types";
import { TaskCard } from "./TaskCard";

interface Props {
  title: string;
  color: string;
  tasks: Task[];
}

export const TaskColumn = ({ title, color, tasks }: Props) => {
  return (
    <div className="flex flex-col gap-4 w-80 h-[calc(100vh-5rem)]">
      <div className="flex flex-row items-center gap-2">
        <span
          className={`h-[7px] w-[7px] rounded-full`}
          style={{ backgroundColor: color }}
        ></span>
        <h1>{title}</h1>
      </div>

      <TaskCard tasks={tasks} />
    </div>
  );
};
