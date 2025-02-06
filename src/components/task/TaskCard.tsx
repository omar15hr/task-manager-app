import { useSortable } from "@dnd-kit/sortable";
import { TaskWithId } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";

interface TaskCardProps {
  task: TaskWithId;
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
      className="flex flex-col bg-[#191B1F] p-4 rounded-2xl w-64 cursor-pointer hover:bg-[#111214] gap-3"
    >
      <div>{task.title}</div>
      <div className="flex flex-row gap-2 items-center">
          <div
            style={{ backgroundColor: task.tags.color, color: task.tags.colorText }}
            className="p-1 h-5 rounded-md w-20 items-center flex justify-center text-sm"
          >
            {task.tags.tag}
          </div>
      </div>
    </div>
  );
}
