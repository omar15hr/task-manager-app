import { useState } from "react";
import { CirclePlusSvg, PencilSvg, TrashSvg } from "../../assets/svgs/Svg";
import { BoardWithId } from "../../interfaces/types";
import { BoardForm } from "./BoardForm";

interface BoardContainerProps {
  boards: BoardWithId[];
  selectBoard: (board: BoardWithId) => void;
}

export function BoardContainer({ boards, selectBoard }: BoardContainerProps) {

  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);

  return (
    <div className="flex flex-col gap-2 mt-4 items-center ml-1 w-full">
      <div className="text-2xl font-bold">Task Manager</div>
      <div className="text-sm">Manage your boards</div>

      <div className="w-full">
        <ul className="flex flex-col gap-2 mt-4">
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => selectBoard(board)}
              className="flex flex-row p-2 justify-between border-2 border-[#506FEA] hover:border-[#384ea5] rounded-full cursor-pointer items-center"
            >
              <img src={board.emoji} alt={board.name} className="w-8 h-8 rounded-full" />
              <span className="ml-1">{board.name}</span>
              <div className="flex gap-1">
                <div>
                  <TrashSvg size={24} color="#506FEA" />
                </div>
                <div>
                  <PencilSvg size={24} color="#506FEA" />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      <button onClick={() => setIsBoardFormOpen(true)} className="flex items-center gap-2 hover:bg-[#2A2D32] p-4 rounded-full cursor-pointer mt-5">
        <CirclePlusSvg size={24} />
        <span>Add new board</span>
      </button>

      {isBoardFormOpen && (
        <BoardForm 
          isBoardFormOpen={isBoardFormOpen} 
          setIsBoardFormOpen={setIsBoardFormOpen}
        />
      )}
    </div>
  );
}
