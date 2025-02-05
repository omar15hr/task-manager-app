import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
}

export const TaskCard = ({ task }: TaskCardProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: task.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      {...attributes}
      {...listeners}
      style={style}
      ref={setNodeRef}
      className="bg-[#1c1e22] rounded-2xl flex flex-col gap-3 p-4 w-full cursor-grab"
    >
      <p>{task.title}</p>
      <p className="bg-blue-300 rounded-4xl px-2 py-1 text-xs w-20 text-blue-900 text-center">
        {task.tags}
      </p>
    </div>
  );
};
