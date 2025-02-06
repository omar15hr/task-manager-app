import { useState } from "react";
import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId } from "../../interfaces/types";
import { BoardForm } from "./BoardForm";

interface BoardContainerProps {
  boards: BoardWithId[];
  selectBoard: (boardId: string) => void;
}

export function BoardContainer({ boards, selectBoard }: BoardContainerProps) {
  const { addBoard, deleteBoard, updateBoard } = useBoardActions();
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const [boardToUpdate, setBoardToUpdate] = useState<BoardWithId | null>(null);

  const handleAddBoard = (name: string, emoji: string) => {
    addBoard({ name, emoji, tasks: [] });
    setIsBoardFormOpen(false);
  };

  const handleUpdateBoard = (board: BoardWithId) => {
    updateBoard(board);
    setIsBoardFormOpen(false);
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <button onClick={() => setIsBoardFormOpen(true)}>Add New Board</button>

      {isBoardFormOpen && (
        <BoardForm
          boardToUpdate={boardToUpdate}
          onSave={boardToUpdate ? handleUpdateBoard : handleAddBoard}
          onCancel={() => setIsBoardFormOpen(false)}
        />
      )}

      {boards.map((board) => (
        <div key={board.id} onClick={() => selectBoard(board.id)}>
          {board.name}
          <button onClick={() => deleteBoard(board.id)}>Delete</button>
          <button onClick={() => setBoardToUpdate(board)}>Edit</button>
        </div>
      ))}
    </div>
  );
}