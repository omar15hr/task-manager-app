import React from "react";
import logos from "../../assets/emojis/logos";
import { useBoardActions } from "../../hooks/useBoardActions";
import { Board, BoardWithId } from "../../interfaces/types";

interface BoardFormProps {
  isBoardFormOpen: boolean;
  setIsBoardFormOpen: (isOpen: boolean) => void;
  boardToUpdate: BoardWithId | null;
  handleUpdateBoard: (board: BoardWithId) => void;
  onCancel: () => void;
}

export function BoardForm({ 
  isBoardFormOpen, 
  setIsBoardFormOpen, 
  boardToUpdate, 
  handleUpdateBoard, 
  onCancel 
}: BoardFormProps) {
  const [selectedLogo, setSelectedLogo] = React.useState<string>("");
  const [boardName, setBoardName] = React.useState<string>("");
  const { addBoard } = useBoardActions();

  React.useEffect(() => {
    if (boardToUpdate) {
      setBoardName(boardToUpdate.name);
      setSelectedLogo(boardToUpdate.emoji);
    } else {
      setBoardName("");
      setSelectedLogo("");
    }
  }, [boardToUpdate]);

  if (!isBoardFormOpen) return null;

  const handleClickOutside = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".modal-content")) {
      setIsBoardFormOpen(false);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!boardName || !selectedLogo) return;

    if (boardToUpdate) {
      const updatedBoard: BoardWithId = {
        ...boardToUpdate,
        name: boardName,
        emoji: selectedLogo,
      };
      handleUpdateBoard(updatedBoard);
    } else {
      const newBoard: Board = {
        name: boardName,
        emoji: selectedLogo,
        tasks: [],
      };
      addBoard(newBoard);
    }

    setIsBoardFormOpen(false);
    setBoardName("");
    setSelectedLogo("");
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-[#00000091] flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-[#2A2D32] p-6 rounded-lg shadow-lg max-w-md w-full modal-content">
        <h2 className="text-2xl font-semibold mb-4">
          {boardToUpdate ? "Edit Board" : "Create New Board"}
        </h2>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title">Board name</label>
          <input 
            type="text" 
            placeholder="Board Name" 
            className="mb-4 p-2 border-2 border-[#464b53] rounded-xl w-full"
            value={boardName}
            onChange={(e) => setBoardName(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="emoji">Board emoji</label>
          <div className="flex flex-wrap gap-2">
            {logos.map((logo) => (
              <img 
                key={logo} 
                src={logo} 
                className={`w-10 rounded-full border-4 cursor-pointer ${
                  selectedLogo === logo ? "border-[#4063EE]" : "border-transparent"
                }`} 
                alt={logo} 
                onClick={() => setSelectedLogo(logo)} 
              />
            ))}
          </div>
        </div>
        
        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="bg-[#4063EE] text-white px-4 py-2 rounded-full hover:bg-[#4063eebb]"
          >
            {boardToUpdate ? "Update board" : "Create board"}
          </button>
          <button
            type="button"
            className="border-2 border-[#464b53] hover:bg-[#575e68] text-white px-4 py-2 rounded-full"
            onClick={() => {
              setIsBoardFormOpen(false);
              onCancel();
            }}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}