import { useMemo, useState } from "react";
import { CirclePlusSvg } from "../assets/svgs/Svg";
import { Column, ColumnId, Task } from "../interfaces/types";
import { ColumnContainer } from "./ColumnContainer";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";

export function Board() {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [columns, setColumns] = useState<Column[]>([]);
  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  
  const columnsIds = useMemo(() => columns.map((col) => col.id), [columns]);


  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 10,
      }
    })
  )

  function createNewColumn() {
    const columnToAdd: Column = {
      id: Math.floor(Math.random() * 1000),
      title: `Column ${columns.length + 1}`,
    };

    setColumns([...columns, columnToAdd]);
  }

  function deleteColumn(id: ColumnId) {
    const filteredColumns = columns.filter((col) => col.id !== id);
    setColumns(filteredColumns);
  }

  function updateColumn(id: ColumnId, title: string) {
    const newColumns = columns.map((col) => {
      if (col.id !== id)  return col;
      return { ...col, title };

    });
    setColumns(newColumns);
  }

  function createTask(columnId: ColumnId) {
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      columnId,
      content: `Task ${tasks.length + 1}`,
      title: "",
    }

    setTasks([...tasks, newTask]);
  }

  function onDragStart(event: DragStartEvent) {
    if (event.active.data.current?.type === "Column") {
      setActiveColumn(event.active.data.current.column);
      return;
    }
  }

  function onDragEnd(event: DragEndEvent) {
   const { active, over } = event;
   if (!over) return;

    const activeColumnId = active.id;
    const overColumnId = over.id;

    if (activeColumnId === overColumnId) return;

    setColumns((columns) => {
      const activeColumnIndex = columns.findIndex(
        (column) => column.id === activeColumnId
      );
      const overColumnIndex = columns.findIndex(
        (column) => column.id === overColumnId
      );

      return arrayMove(columns, activeColumnIndex, overColumnIndex);
    });
  }

  return (
    <div className="m-auto flex min-h-screen w-full items-center overflow-x-auto overflow-y-hidden px-[40px]">
      <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <div className="m-auto flex gap-4">
          <div className="flex gap-4">
            <SortableContext items={columnsIds}>
              {columns.map((col) => (
                <ColumnContainer
                  key={col.id}
                  column={col}
                  deleteColumn={deleteColumn}
                  updateColumn={updateColumn}
                  createTask={createTask}
                  tasks={tasks.filter((task) => task.columnId === col.id)}
                />
              ))}
            </SortableContext>
          </div>

          <button
            onClick={createNewColumn}
            className="flex flex-row gap-2 items-center justify-center h-[60px] w-[350px] min-w-[350px] cursor-pointer rounded-lg bg-neutral-900 border-2 border-neutral-800 p-4 ring-rose-500 hover:ring-2"
          >
            <CirclePlusSvg size={25} />
            <span>Add Column</span>
          </button>

          <DragOverlay>
            {activeColumn && (
              <ColumnContainer
                tasks={tasks}
                column={activeColumn}
                deleteColumn={deleteColumn}
                createTask={createTask}
                updateColumn={updateColumn}
              />
            )}
          </DragOverlay>
        </div>
      </DndContext>
    </div>
  );
}
