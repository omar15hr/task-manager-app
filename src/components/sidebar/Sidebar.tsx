import { BaselineSvg, CirclePlusSvg, CloseSvg } from "../Svg";

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
        {isOpen ? (
          <CloseSvg size={24} />
        ) : (
          <BaselineSvg size={24} />
        )}
      </button>
      {isOpen && (
        <div className="px-4 pb-6 self-start w-full">
          <ul className="mb-8 text-sm font-medium">
            <li>
              <div className="flex flex-row gap-3 items-center rounded py-3 pl-3 pr-4 text-gray-50 hover:bg-[#2A2D32] cursor-pointer">
                <CirclePlusSvg size={26} />
                <span>Add new board</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}