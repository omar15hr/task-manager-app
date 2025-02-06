import { useState } from "react";
import { CirclePlusSvg, PencilSvg, TrashSvg } from "../../assets/svgs/Svg";
import { BoardId, BoardWithId } from "../../interfaces/types";
import { BoardForm } from "./BoardForm";
import { useBoardActions } from "../../hooks/useBoardActions";

interface BoardContainerProps {
  boards: BoardWithId[];
  selectBoard: (board: BoardWithId) => void;
}

export function BoardContainer({ boards, selectBoard }: BoardContainerProps) {
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [boardToDelete, setBoardToDelete] = useState<BoardId | null>(null);
  const [boardToUpdate, setBoardToUpdate] = useState<BoardWithId | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<BoardId | null>(null);


  const modalBoard = boards.find((board) => board.id === boardToDelete);
  const { deleteBoard, updateBoard } = useBoardActions();

  const confirmDelete = (boardId: BoardId) => {
    setBoardToDelete(boardId);
  };

  const handleDeleteBoard = () => {
    if (boardToDelete) {
      deleteBoard(boardToDelete);
      setBoardToDelete(null);
    }
  };

  const handleUpdateBoard = (board: BoardWithId) => {
    updateBoard(board);
    setBoardToUpdate(null);
  };

  return (
    <div className="flex flex-col gap-2 mt-4 items-center ml-1 w-full">
      <div className="text-2xl font-bold">Task Manager</div>
      <div className="text-sm">Manage your boards</div>

      <div className="w-full">
        <ul className="flex flex-col gap-2 mt-4">
          {boards.map((board) => (
            <li
              key={board.id}
              onClick={() => {
                selectBoard(board);
                setSelectedBoardId(board.id);
              }}
              className={`flex flex-row p-2 justify-between border-2 rounded-full cursor-pointer items-center 
                ${selectedBoardId === board.id ? "border-[#FFAA00]" : "border-[#506FEA]"}
                hover:border-[#384ea5]`}
            >
              <img
                src={board.emoji}
                alt={board.name}
                className="w-8 h-8 rounded-full"
              />
              <span className="ml-1">{board.name}</span>
              <div className="flex gap-1">
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    confirmDelete(board.id);
                  }}
                >
                  <TrashSvg size={24} color="#506FEA" />
                </div>
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    setBoardToUpdate(board);
                    setIsBoardFormOpen(true)
                  }}
                >
                  <PencilSvg size={24} color="#506FEA" />
                </div>
              </div>
            </li>
          ))}
          {boardToDelete && (
            <div className="w-full h-full flex items-center justify-center bg-[#2A2D32] rounded-2xl bg-opacity-50">
              <div className="p-4 rounded shadow-lg">
                <p className="text-lg">{`¿ Are you sure to delete "${modalBoard?.name}" ?`}</p>
                <div className="flex gap-2 justify-around mt-4">
                  <button
                    onClick={handleDeleteBoard}
                    className="bg-red-500 text-white w-24 p-2 rounded cursor-pointer"
                  >
                    Sí
                  </button>
                  <button
                    onClick={() => setBoardToDelete(null)}
                    className="bg-gray-500 text-white w-24 p-2 rounded cursor-pointer"
                  >
                    Cancelar
                  </button>
                </div>
              </div>
            </div>
          )}
          
        </ul>
      </div>

      <button
        onClick={() => setIsBoardFormOpen(true)}
        className="flex items-center gap-2 hover:bg-[#2A2D32] p-4 rounded-full cursor-pointer mt-5"
      >
        <CirclePlusSvg size={24} />
        <span>Add new board</span>
      </button>

      {isBoardFormOpen && (
        <BoardForm
          boardToUpdate={boardToUpdate}
          handleUpdateBoard={handleUpdateBoard}
          onCancel={() => setBoardToUpdate(null)}
          isBoardFormOpen={isBoardFormOpen}
          setIsBoardFormOpen={setIsBoardFormOpen}
        />
      )}
    </div>
  );
}
