import { useState } from "react";
import { Sidebar } from "./components/sidebar/Sidebar";
import { Board } from "./components/board/Board";
import { BoardWithId } from "./interfaces/types";
import { StartBoard } from "./components/board/StartBoard";

export default function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [boardSelected, setBoardSelected] = useState<BoardWithId | null>(null);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const selectBoard = (board: BoardWithId) => {
    setBoardSelected(board);
  };

  return (
    <div className="flex flex-row h-[100vh] overflow-hidden">
      <Sidebar 
        isSidebarOpen={isSidebarOpen} 
        toggleSidebar={toggleSidebar}
        selectBoard={selectBoard}
      />

      <div
        className={`flex-1 transition-all duration-300 ease-in-out ${
          isSidebarOpen ? "ml-[260px]" : "ml-[65px]"
        }`}
      >
        {
          boardSelected ? <Board isSidebarOpen={isSidebarOpen} /> : <StartBoard />
        }
      </div>
    </div>
  );
}