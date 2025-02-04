import { useSortable } from "@dnd-kit/sortable";
import { BoardWithId } from "../../interfaces/types";
import { CSS } from "@dnd-kit/utilities";
import { PencilSvg, TrashSvg } from "../Svg";
import { useUserActions } from "../../hooks/useBoardsActions";

interface BoardProps {
  board: BoardWithId;
  handleBoardId: (id: string) => void;
  selectedBoardId: string | null;
  openEditModal: (board: BoardWithId) => void;
}

export function BoardContainer({ board, handleBoardId, selectedBoardId, openEditModal  }: BoardProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: board.id });
  const { removeBoard } = useUserActions();

  const style = { transform: CSS.Transform.toString(transform), transition };

  return (
    <div
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      className={`p-2 rounded-4xl text-black my-2 w-full cursor-pointer border-2 
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
          <div onClick={() => removeBoard(board.id)}><TrashSvg size={24} /></div>
          <div onClick={() => openEditModal(board)}><PencilSvg size={24} /></div>
        </div>
        
      </div>
    </div>
  );
}
