import { useMemo, useState } from "react";
import { BoardWithId, Task } from "../../interfaces/types";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { ColumnContainer } from "./ColumnContainer";
import { TaskCard } from "../task/TaskCard";

interface BoardProps {
  isSidebarOpen: boolean;
  boardSelected: BoardWithId;
}

export interface Column {
  id: string;
  title: string;
  color: string;
}

const initialTasks: Task[] = [
  {
    id: "task1",
    title: "Task 1",
    status: "In Progress",
    background: null,
    tags: [{ tag: "Front-end", color: "#768CE4", colorText: '#455285' }],
    columnId: "1",
  },
  {
    id: "task2",
    title: "Task 2",
    status: "In Review",
    background: null,
    tags: [
      { tag: "Back-end", color: "#FEEF49", colorText: '#7e7625' },
      { tag: "Front-end", color: "#768CE4", colorText: '#455285'}
    ],
    columnId: "3",
  },
  {
    id: "task3",
    title: "Task 3",
    status: "In Progress",
    background: null,
    tags: [{ tag: "Design", color: "#D784EA", colorText: '#71467a' }],
    columnId: "2",
  },
  {
    id: "task4",
    title: "Task 4",
    status: "In Progress",
    background: null,
    tags: [{ tag: "Design", color: "#D784EA", colorText: '#71467a' }],
    columnId: "2",
  },
];

export function Board({ isSidebarOpen, boardSelected }: BoardProps) {
  const [columns, setColumns] = useState<Column[]>([
    { id: "1", title: "Backlog", color: "#768CE4" },
    { id: "2", title: "In Progress", color: "#FEEF49" },
    { id: "3", title: "In Review", color: "#D784EA" },
    { id: "4", title: "Completed", color: "#80FA9D" },
  ]);

  const initialTasks2: Task[] = boardSelected.tasks;
  console.log(initialTasks);
  console.log(initialTasks2);

  const [activeColumn, setActiveColumn] = useState<Column | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

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
      setActiveColumn(event.active.data.current?.columns);
      return;
    }

    if (event.active.data.current?.type === "Task") {
      setActiveTask(event.active.data.current?.task);
      return;
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveColumn(null);
    setActiveTask(null);
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

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id;
    const overId = over.id;

    if (activeId === overId) return;

    const isActiveATask = active.data.current?.type === "Task";
    const isOverATask = over.data.current?.type === "Task";

    if (isActiveATask && isOverATask) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);
        const overIndex = tasks.findIndex((task) => task.id === overId);

        tasks[activeIndex].columnId = tasks[overIndex].columnId;
        
        return arrayMove(tasks, activeIndex, overIndex);
      });
    }

    const isOverAColumn = over.data.current?.type === "Column";

    if (isActiveATask && isOverAColumn) {
      setTasks((tasks) => {
        const activeIndex = tasks.findIndex((task) => task.id === activeId);

        tasks[activeIndex].columnId = overId.toString();
        
        return arrayMove(tasks, activeIndex, activeIndex);
      });
    }
  };

  return (
    <DndContext
      sensors={sensors}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={onDragOver}
    >
      <div className="flex flex-row gap-4 p-4 items-center justify-center">
        <SortableContext items={tasksIds}>
          {columns.map((col) => (
            <ColumnContainer key={col.id} isSidebarOpen={isSidebarOpen} columns={col} tasks={tasks.filter((task) => task.columnId === col.id)} />
          ))}
        </SortableContext>
      </div>
      <DragOverlay>
        {activeColumn && 
            (<ColumnContainer isSidebarOpen={isSidebarOpen} columns={activeColumn} tasks={tasks.filter((task) => task.columnId === activeColumn.id)} />)
        }
        {activeTask && 
          (<TaskCard task={activeTask} />)
        }
      </DragOverlay>
    </DndContext>
  );
}