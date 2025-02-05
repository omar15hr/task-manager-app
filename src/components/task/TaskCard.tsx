import { useSortable } from "@dnd-kit/sortable";
import { Task } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="flex flex-col bg-[#191B1F] p-4 rounded-2xl w-64 cursor-grab relative hover:bg-[#111214] opacity-50 border-2 border-rose-500 h-24"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col bg-[#191B1F] p-4 rounded-2xl w-64 cursor-pointer hover:bg-[#111214]"
    >
      <div>{task.title}</div>
      <div className="flex flex-row gap-2 items-center">
        {task.tags.map((tag) => (
          <div
            key={tag.color}
            style={{ backgroundColor: tag.color, color: tag.colorText }}
            className="p-1 rounded-full w-24 items-center flex justify-center text-sm"
          >
            {tag.tag}
          </div>
        ))}
      </div>
    </div>
  );
}
