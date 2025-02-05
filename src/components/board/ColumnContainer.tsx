import { useMemo } from "react";
import { Task } from "../../interfaces/types";
import { Column } from "./Board";
import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { TaskCard } from "../task/TaskCard";

interface ColumnContainerProps {
  columns: Column;
  tasks: Task[];
  isSidebarOpen: boolean;
}

export function ColumnContainer({ columns, tasks, isSidebarOpen }: ColumnContainerProps) {
  const tasksStatus = useMemo(() => {
    if (!tasks) return [];
    return tasks.map((task) => task.id);
  }, [tasks]);

  const { title, color } = columns;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: columns.id,
    data: {
      type: "Column",
      columns,
    },
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging)
    return (
      <div
        ref={setNodeRef}
        style={style}
        className={`flex flex-col bg-[#2A2D32] w-[300px] h-[700px] max-h-[700px] rounded-md items-center p-2 opacity-60 border-2 border-rose-500`}
      ></div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`flex flex-col bg-[#2A2D32] h-[700px] max-h-[700px] rounded-md items-center p-2 ${
        isSidebarOpen ? "w-[300px]" : "w-[340px]"
      }`}
    >
      <div className="flex flex-row gap-2 items-center font-bold">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        {title}
      </div>

      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-hidden overflow-y-auto">
        <SortableContext items={tasksStatus}>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
