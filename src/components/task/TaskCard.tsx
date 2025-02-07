import { useSortable } from "@dnd-kit/sortable";
import { TaskWithId } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: TaskWithId;
}

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: task.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform), transition
  };

  return (
    <div
      key={task.id}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col gap-4 bg-[#2A2D32] hover:bg-[#363a41] w-50 rounded-2xl p-4 cursor-pointer"
    >
      <div>{task.title}</div>
      <div className="border-2 border-[#494e57] rounded-2xl w-24 text-xs hover:shadow-2xl">
        {task.tag}
      </div>
    </div>
  );
}
