import { closestCenter, DndContext, DragEndEvent } from "@dnd-kit/core";
import { BoardWithId, Task } from "../../interfaces/types";
import { TaskCard } from "./TaskCard";
import { useBoardsActions } from "../../hooks/useBoardsActions";
import { arrayMove, SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

interface TaskColumnProps {
  title: string;
  tasks?: Task[];
  isSidebarOpen: boolean;
  colorClass: string;
  boards: BoardWithId[];
  selectedBoard: string | null;
}

export const TaskColumn = ({
  title,
  tasks,
  isSidebarOpen,
  selectedBoard,

  colorClass,
}: TaskColumnProps) => {
  const { updatedOrderTask } = useBoardsActions();

  const handleDragEndTask = (event: DragEndEvent) => {
    const { active, over } = event;

    const oldIndex = tasks?.findIndex((task) => task.id === active.id);
    const newIndex = tasks?.findIndex((task) => task.id === over?.id);
    
    const newOrder = arrayMove(tasks!, oldIndex!, newIndex!);
    updatedOrderTask(selectedBoard!, newOrder);

  };

  return (
    <DndContext
      onDragEnd={handleDragEndTask}
      collisionDetection={closestCenter}
    >
      <SortableContext items={tasks!} strategy={verticalListSortingStrategy}>
        <div
          className={`flex flex-col gap-3 items-center ${
            isSidebarOpen ? "w-64" : "w-80"
          } h-[calc(100vh-2rem)] overflow-auto`}
        >
          <div className="flex flex-row gap-3 items-center">
            <span
              className={`w-3 h-3 rounded-4xl ${colorClass} p-2 border-0`}
            ></span>
            <h1>{title}</h1>
          </div>
          {tasks?.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </DndContext>
  );
};
