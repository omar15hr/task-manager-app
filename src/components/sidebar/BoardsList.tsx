import { PencilSvg, TrashSvg } from "../Svg";
import { useUserActions } from "../../hooks/useBoardsActions";
import { useState } from "react";
import { useAppSelector } from "../../hooks/store";

export const BoardsList = () => {
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const boards = useAppSelector((state) => state.boards);

  const { removeBoard } = useUserActions();

  const handleDeleteBoard = (id: string) => {
    removeBoard(id);
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = (id: string) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };
  return (
    <div className="flex flex-col gap-4">
      {boards.map((board) => (
        <div
          key={board.id}
          className="flex flex-row gap-3 items-center justify-start rounded-4xl border-[#506FEA] border-solid border-2 p-2 cursor-pointer hover:border-[#3d56b6]"
        >
          <div className="flex flex-row gap-2 items-center w-3/4">
            <img
              className="p-1 rounded-full w-10 h-10"
              style={{ backgroundColor: board.color }}
              src={board.emoji}
            />
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
        <div className="flex flex-row gap-3 items-center justify-center rounded-4xl p-2 bg-[#2A2D32] mt-2">
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
    </div>
  );
};
