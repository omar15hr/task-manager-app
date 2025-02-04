import { useState } from "react";
import {
  DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
} from "@dnd-kit/sortable";
import type { BoardData } from "./interfaces/types";
import { useAppSelector } from "./hooks/store";
import { Sidebar } from "./components/sidebar/Sidebar";
import { TaskBoard } from "./components/taskBoard/TaskBoard";
import { useUserActions } from "./hooks/useBoardsActions";

export default function App() {
  const boards = useAppSelector((state) => state.boards);
  const tasksInitialState = useAppSelector((state) => state.tasks);

  const [show, setShow] = useState(true);
  const [tasks] = useState<BoardData[]>(tasksInitialState);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  const { updatedOrder } = useUserActions();

  const toggleSidebar = () => {
    setShow(!show);
  };

  const handleBoardId = (id: string) => {
    setSelectedBoard(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = boards.findIndex((board) => board.id === active.id);
      const newIndex = boards.findIndex((board) => board.id === over.id);

      const newOrder = arrayMove(boards, oldIndex, newIndex);
      updatedOrder(newOrder);
    }
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  return (
    <div className="flex">
      <Sidebar
        isOpen={show}
        toggleSidebar={toggleSidebar}
        sensors={sensors}
        handleBoardId={handleBoardId}
        handleDragEnd={handleDragEnd}
        boards={boards}
        selectedBoardId={selectedBoard}
      />

      <TaskBoard
        isSidebarOpen={show}
        boards={boards}
        selectedBoard={selectedBoard}
        tasks={tasks}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
}

