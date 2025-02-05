import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useMemo, useState } from "react";
import { CSS } from "@dnd-kit/utilities";

export default function App() {
  return (
    <div className="flex flex-row">
      <Sidebar />
      <Board />
    </div>
  );
}

export function Sidebar() {
  return (
    <div className="flex flex-col w-[300px] h-[100vh] p-6 ml-3">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-2xl font-bold">Task Manager</div>
        <div className="text-sm">Manage your boards</div>
      </div>
    </div>
  );
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

export function Board() {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "Backlog", color: "#768CE4" },
    { id: "2", title: "In Progress", color: "#FEEF49" },
    { id: "3", title: "In Review", color: "#D784EA" },
    { id: "4", title: "Completed", color: "#80FA9D" },
  ]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const columnsId = useMemo(() => columns.map((col) => col.id), [columns]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
        delay: 100,
      },
    })
  );

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.columns);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (col) => col.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (col) => col.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <div className="flex flex-row gap-4 p-4 items-center justify-center">
        <SortableContext items={columnsId}>
          {columns.map((col) => (
            <ColumnContainer key={col.id} columns={col} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeColumn && <ColumnContainer columns={activeColumn} />}
      </DragOverlay>
    </DndContext>
  );
}

interface ColumnContainerProps {
  columns: Column;
}

export function ColumnContainer({ columns }: ColumnContainerProps) {
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
        className="flex flex-col bg-[#2A2D32] w-[300px] h-[700px] max-h-[700px] rounded-md items-center p-2 opacity-60 border-2 border-rose-500"
      ></div>
    );

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex flex-col bg-[#2A2D32] w-[300px] h-[700px] max-h-[700px] rounded-md items-center p-2"
    >
      <div className="flex flex-row gap-2 items-center font-bold">
        <span
          className="h-3 w-3 rounded-full"
          style={{ backgroundColor: color }}
        ></span>
        {title}
      </div>

      <div className="flex flex-grow"></div>
    </div>
  );
}
