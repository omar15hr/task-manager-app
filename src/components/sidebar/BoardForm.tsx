interface BoardFormProps {
  isBoardFormOpen: boolean;
  setIsBoardFormOpen: (isOpen: boolean) => void;
}

export function BoardForm({ isBoardFormOpen, setIsBoardFormOpen }: BoardFormProps) {
  if (!isBoardFormOpen) return null;

  const handleClickOutside = (event: React.MouseEvent) => {
    const modalContent = event.target as HTMLElement;
    if (modalContent.closest(".modal-content") === null) {
      setIsBoardFormOpen(false);
    }
  };

  return (
    <div onClick={handleClickOutside} className="fixed inset-0 bg-[#00000091] flex items-center justify-center z-50">
      <div className="bg-[#2A2D32] p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Create New Board</h2>

        <div className="flex flex-col gap-2 mb-4">
        <label htmlFor="title">Board name</label>
        <input type="text" placeholder="Board Name" className="mb-4 p-2 border-2 border-[#464b53] rounded-xl w-full" />
        </div>

        
        <div className="flex flex-row gap-2">
        <button
          className="bg-[#4063EE] text-white px-4 py-2 rounded-full hover:bg-[#4063eebb]"
          onClick={() => {
            setIsBoardFormOpen(false);
          }}
        >
          Create board
        </button>
        <button
          className="border-2 border-[#464b53] hover:bg-[#575e68] text-white px-4 py-2 rounded-full mr-2"
          onClick={() => setIsBoardFormOpen(false)}
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
}
