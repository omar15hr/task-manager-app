import {
  DndContext,
  DragEndEvent,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardData, BoardWithId } from "../../interfaces/types";
import { TaskList } from "./TaskList";
import NewTask from "./NewTask";

interface ContentProps {
  isSidebarOpen: boolean;
  boards: BoardWithId[];
  selectedBoard: string | null;
  tasks: BoardData[];
  handleDragEnd: (event: DragEndEvent) => void;
}

export function TaskBoard({
  isSidebarOpen,
  boards,
  selectedBoard,
  tasks,
  handleDragEnd,
}: ContentProps) {
  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-4 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-3 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl flex flex-col">
        <div className="flex flex-row items-center justify-center mt-5 gap-5">
          <div className="flex flex-col items-center justify-center">
            <DndContext
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
            >

              <SortableContext
                items={boards}
                strategy={verticalListSortingStrategy}
              >
                <TaskList boardId={selectedBoard} tasks={tasks} />
              </SortableContext>
            </DndContext>
          </div>
        </div>
        <NewTask />
      </div>
    </div>
  );
}
