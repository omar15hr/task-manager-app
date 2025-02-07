import { useSortable } from "@dnd-kit/sortable";
import { CancelSvg, PlusSvg } from "../assets/svgs/Svg";
import { Column, ColumnId, Task } from "../interfaces/types";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";
import { TaskCard } from "./TaskCard";

interface ColumnContainerProps {
  column: Column;
  deleteColumn: (id: ColumnId) => void;
  updateColumn: (id: ColumnId, title: string) => void;
  
  tasks: Task[];
  createTask: (id: ColumnId) => void;
}

export function ColumnContainer({
  column,
  tasks,
  deleteColumn,
  updateColumn,
  createTask,
}: ColumnContainerProps) {

  const [editMode, setEditMode] = useState(false);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "column",
      column,
    },
    disabled: editMode,
  });

  const style = { transition, transform: CSS.Transform.toString(transform) };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="bg-gray-900 w-[350px] h-[500] max-h-[500px] flex flex-col rounded-md opacity-40 border-2 border-rose-500"
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-gray-900 w-[350px] h-[500] max-h-[500px] flex flex-col rounded"
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => setEditMode(true)}
        className="bg-gray-700 text-md h-[60px] cursor-grab rounded-b-none p-3 font-bold justify-between items-center border-4 border-gray-700 flex flex-row"
      >
        <div className="flex justify-between items-center bg-gray-800 px-2 py-1 text-sm rounded-full">
          0
        {!editMode && column.title}
        </div>
        {editMode && (
          <input
          autoFocus 
          onBlur={() => setEditMode(false)}
            type="text"
            onKeyDown={(e) => {
              if (e.key !== "Enter") {
                setEditMode(false);
              }
            }}
            className="bg-black focus:border-rose-500 border rounded outline-none px-2"
            value={column.title}
            onChange={(e) => updateColumn(column.id, e.target.value)}
          />
        )}
      <button onClick={() => deleteColumn(column.id)}>
        <CancelSvg size={20} />
      </button>
      </div>


      <div className="flex flex-grow flex-col gap-4 p-2 overflow-x-auto overflow-y-auto">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>

      <button onClick={() => createTask(column.id)} className="flex gap-2 items-center border-2 rounded-md p-4">
        <PlusSvg size={20} />
        <span>Add task</span>
      </button>
    </div>
  );
}
