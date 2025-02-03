import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/store";
import { deleteBoardById } from "../../store/boards/boardSlice";
import {
  BaselineSvg,
  CirclePlusSvg,
  CloseSvg,
  PencilSvg,
  TrashSvg,
} from "../Svg";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

export default function Sidebar({ isOpen, toggleSidebar }: SidebarProps) {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const boards = useAppSelector((state) => state.boards);
  const dispatch = useAppDispatch();

  const handleDeleteBoard = (id: string) => {
    dispatch(deleteBoardById(id));
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

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
              {boards.map((board) => (
                <div
                  key={board.id}
                  className="flex flex-row gap-3 items-center justify-start rounded-4xl border-[#506FEA] border-solid border-2 p-2 cursor-pointer hover:border-[#3d56b6]"
                >
                  <div className="flex flex-row gap-2 items-center w-3/4">
                    <span
                      className="p-2 rounded-full"
                      style={{ backgroundColor: board.color }}
                    >
                      {board.emoji}
                    </span>
                    <h1 className="text-[16px]">{board.name}</h1>
                  </div>
                  <div className="flex flex-row gap-3 w-1/4 justify-center">
                    <button>
                      <PencilSvg size={24} />
                    </button>
                    <button onClick={() => handleConfirmDelete(board.id)}>
                      <TrashSvg size={24} />
                    </button>
                  </div>
                </div>
              ))}
              {confirmDeleteId && (
                <div className="flex flex-row gap-3 items-center justify-center rounded-4xl p-2 bg-[#2A2D32]">
                  <span className="text-white">Are you sure?</span>
                  <button
                    onClick={() => handleDeleteBoard(confirmDeleteId)}
                    className="px-4 py-1 text-sm bg-green-500 rounded-xl text-white hover:bg-green-600"
                  >
                    Yes
                  </button>
                  <button
                    onClick={handleCancelDelete}
                    className="px-4 py-1 text-sm bg-red-500 rounded-xl text-white hover:bg-red-600"
                  >
                    No
                  </button>
                </div>
              )}
              <div className="flex flex-row gap-3 items-center rounded-4xl py-3 pl-3 pr-4 text-gray-50 hover:bg-[#2A2D32] cursor-pointer">
                <CirclePlusSvg size={26} />
                <span className="text-lg">Add new board</span>
              </div>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

