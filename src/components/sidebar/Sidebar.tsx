import { useState } from "react";
import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId } from "../../interfaces/types";
import { BoardForm } from "./BoardForm";
import { BaselineSvg, CancelSvg, CirclePlusSvg } from "../../assets/svgs/Svg";

interface SidebarProps {
  boards: BoardWithId[];
  setSelectedBoard: (board: BoardWithId) => void;
  onToggleSidebar: (isOpen: boolean) => void;
}

export function Sidebar({
  boards,
  setSelectedBoard,
  onToggleSidebar,
}: SidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [emoji, setEmoji] = useState<string>("");
  const [isFormBoardOpen, setIsFormBoardOpen] = useState<boolean>(false);

  const { addBoard } = useBoardActions();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const emojiSelected = emoji as string;

    if (!name || !emojiSelected) return;

    addBoard({ name, emoji: emojiSelected, tasks: [] });
    form.reset();
    setIsFormBoardOpen(false);
  };

  const toggleSidebar = () => {
    const newState = !isSidebarOpen;
    setIsSidebarOpen(newState);
    onToggleSidebar(newState);
  };

  return (
    <div
      className={`fixed sm:relative h-screen sm:h-auto z-10 ${
        isSidebarOpen ? "w-80" : "w-20"
      } transition-all duration-300 ease-in-out bg-[#2A2D32] text-white`}
    >
      <button
        onClick={toggleSidebar}
        className={`flex p-2 absolute top-2 w-full ${
          isSidebarOpen ? "justify-end" : "justify-center"
        }`}
      >
        {isSidebarOpen ? <CancelSvg size={25} /> : <BaselineSvg size={25} />}
      </button>
      <div className="p-4">
        <div
          className={`flex flex-col items-center ${!isSidebarOpen && "hidden"}`}
        >
          {isSidebarOpen && (
            <div className="text-2xl font-bold mb-4 text-center mt-10">
              Task Manager
            </div>
          )}
          <div className="flex flex-col gap-2 w-full mt-5">
            {boards.map((board) => (
              <div
                key={board.id}
                className="flex flex-row gap-2 items-center border-2 border-[#42474e] p-2 rounded-full w-full hover:border-[#585f69] hover:shadow-xl cursor-pointer"
                onClick={() => setSelectedBoard(board)}
              >
                <div>
                  <img src={board.emoji} alt={board.name} className="w-8 h-8" />
                </div>
                {isSidebarOpen && <div>{board.name}</div>}
              </div>
            ))}
          </div>
          <button
            className="flex flex-row gap-2 justify-center border-2 border-[#42474e] p-2 rounded-full w-full hover:border-[#585f69] hover:shadow-xl cursor-pointer mt-10"
            onClick={() => setIsFormBoardOpen(true)}
          >
            <CirclePlusSvg size={25} />
            <span>Add new board</span>
          </button>
        </div>
      </div>
      {isFormBoardOpen && (
        <BoardForm
          handleSubmit={handleSubmit}
          onClose={() => setIsFormBoardOpen(false)}
          setEmoji={setEmoji}
          emoji={emoji}
        />
      )}
    </div>
  );
}
