import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/store";
import { BoardWithId } from "./interfaces/types";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Board } from "./components/board/Board";

export default function App() {
  const boards = useAppSelector((state) => state.boards);

  const [selectedBoard, setSelectedBoard] = useState<BoardWithId | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleToggleSidebar = (isOpen: boolean) => {
    setIsSidebarOpen(isOpen);
  };

  useEffect(() => {
    if (selectedBoard) {
      const updatedBoard = boards.find(
        (board) => board.id === selectedBoard.id
      );
      if (updatedBoard) {
        setSelectedBoard(updatedBoard);
      }
    }
  }, [boards, selectedBoard]);

  const tasks = selectedBoard ? selectedBoard.tasks : [];

  return (
    <div className="flex flex-row h-[100vh]">
      <Sidebar
        boards={boards}
        setSelectedBoard={setSelectedBoard}
        onToggleSidebar={handleToggleSidebar}
      />
      <Board
        tasks={tasks}
        selectedBoard={selectedBoard}
        isSidebarOpen={isSidebarOpen}
      />
    </div>
  );
}
