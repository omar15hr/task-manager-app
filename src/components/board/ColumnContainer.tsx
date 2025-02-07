import {
  closestCenter,
  DndContext,
  DragEndEvent,
  DragOverEvent,
} from "@dnd-kit/core";
import { BoardWithId, TaskWithId } from "../../interfaces/types";
import { TaskCard } from "../task/TaskCard";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useBoardActions } from "../../hooks/useBoardActions";
import { useEffect, useState } from "react";

interface ColumnContainerProps {
  tasks: TaskWithId[];
  selectedBoard: BoardWithId;
}

const columns = [
  { id: "backlog", title: "Backlog", status: "backlog", color: "#768CE4" },
  {
    id: "in-process",
    title: "In Process",
    status: "in-process",
    color: "#FEEF49",
  },
  {
    id: "in-preview",
    title: "In Preview",
    status: "in-preview",
    color: "#D784EA",
  },
  {
    id: "completed",
    title: "Completed",
    status: "completed",
    color: "#80FA9D",
  },
];

export function ColumnContainer({
  tasks,
  selectedBoard,
}: ColumnContainerProps) {

  const [newTasks, setNewTasks] = useState(tasks);

  useEffect(() => {
    setNewTasks(tasks);
  }, [tasks])


  const { updateBoard } = useBoardActions();

  const onDragEnd = (event: DragEndEvent) => {

    const { active, over } = event;

    const oldIndex = newTasks.findIndex((task) => task.id === active.id);
    const newIndex = newTasks.findIndex((task) => task.id === over?.id);

    if (oldIndex === newIndex) return;

    const newOrder = arrayMove(newTasks, oldIndex, newIndex);
    setNewTasks(newOrder);
    console.log(newOrder);
  };
  

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      
    </DndContext>
  );
}
