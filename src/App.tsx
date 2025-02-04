import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAppSelector } from "./hooks/store";
import { Sidebar } from "./components/sidebar/Sidebar";
import { useBoardsActions } from "./hooks/useBoardsActions";
import { TaskBoard } from "./components/taskBoard/TaskBoard";

export default function App() {
  const boards = useAppSelector((state) => state.boards);

  const [show, setShow] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  const { updatedOrder } = useBoardsActions();

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

  return (
    <div className="flex">
      <Sidebar
        isOpen={show}
        toggleSidebar={toggleSidebar}
        handleBoardId={handleBoardId}
        handleDragEnd={handleDragEnd}
        boards={boards}
        selectedBoardId={selectedBoard}
      />

      <TaskBoard
        isSidebarOpen={show}
        selectedBoard={selectedBoard}
        boards={boards}
      />
    </div>
  );
}



