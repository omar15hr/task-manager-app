import { useSortable } from "@dnd-kit/sortable";
import { BoardWithId } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";
import { PencilSvg, TrashSvg } from "../Svg";

interface BoardProps {
  board: BoardWithId;
  handleBoardId: (id: string) => void;
  selectedBoardId: string | null;
}

export function BoardContainer({ board, handleBoardId, selectedBoardId  }: BoardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: board.id });

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-2 rounded-4xl shadow-md text-black my-2 w-full cursor-pointer border-2 
        ${selectedBoardId === board.id ? "border-[#4661cc]" : "border-[#191B1F]"} 
        hover:border-[#4661cc]`}
      onClick={() => handleBoardId(board.id)}
    >
      <div className="flex flex-row">
        <div className="flex flex-row gap-3 items-center w-3/4">
          <img className="flex h-8 w-8 bg-amber-100 rounded-4xl items-center justify-center" src={board.emoji} alt="emoji" />
          <h1 className="text-white">{board.name}</h1>
        </div>
        <div className="flex flex-row gap-2 items-center justify-center text-white w-1/4">
          <TrashSvg size={24} onClick={() => handleBoardId(board.id)} />
          <PencilSvg size={24} onClick={() => handleBoardId(board.id)} />
        </div>
      </div>
    </div>
  );
}
