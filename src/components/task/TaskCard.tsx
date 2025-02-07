import { TaskWithId } from "../../interfaces/types";

interface TaskCardProps {
  task: TaskWithId;
}

export function TaskCard({ task }: TaskCardProps) {
  return (
    <div
      key={task.id}
      className="flex flex-col gap-4 bg-[#2A2D32] hover:bg-[#363a41] w-50 rounded-2xl p-4 cursor-pointer"
    >
      <div>{task.title}</div>
      <div className="border-2 border-[#494e57] rounded-2xl w-24 text-xs hover:shadow-2xl">{task.tag}</div>
    </div>
  );
}
