import { BaselineSvg, CloseSvg } from "../Svg";
import { BoardsList } from "./BoardsList";
import NewBoard from "./NewBoard";


interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  return (
    <nav
      className={`fixed left-0 bottom-0 flex flex-col items-end h-full bg-[#191B1F] pt-6 pb-8 transition-all duration-300 ${
        isOpen ? "w-80" : "w-16"
      }`}
    >
      <button
        type="button"
        className="py-4 px-2 text-2xl text-white hover:text-gray-200"
        onClick={toggleSidebar}
      >
        {isOpen ? <CloseSvg size={24} /> : <BaselineSvg size={24} />}
      </button>
      {isOpen && (
        <div className="px-4 pb-6 self-start w-full">
          <ul className="mb-8 text-sm font-medium">
            <li className="flex flex-col gap-3">
              <BoardsList />
              <NewBoard />
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
