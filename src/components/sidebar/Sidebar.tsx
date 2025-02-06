import { useAppSelector } from "../../hooks/store";
import { BoardContainer } from "./BoardContainer";

interface SidebarProps {
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  selectBoard: (boardId: string) => void;
}

export function Sidebar({ isSidebarOpen, toggleSidebar, selectBoard }: SidebarProps) {
  const boards = useAppSelector((state) => state.boards);

  return (
    <div
      className={`fixed top-0 left-0 h-[100vh] p-4 transition-all duration-300 ease-in-out ${
        isSidebarOpen ? "w-[250px]" : "w-[64px]"
      }`}
    >
      <button onClick={toggleSidebar} className="flex items-center justify-center w-8 h-8 rounded-full">
        {isSidebarOpen ? "Close" : "Open"}
      </button>

      {isSidebarOpen && <BoardContainer boards={boards} selectBoard={selectBoard} />}
    </div>
  );
}