import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId } from "../../interfaces/types";

interface SidebarProps {
  boards: BoardWithId[];
  setSelectedBoard: (board: BoardWithId) => void;
}

export function Sidebar({ boards, setSelectedBoard }: SidebarProps) {

    const { addBoard } = useBoardActions();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const emoji = formData.get("emoji") as string;

    addBoard({ name, emoji, tasks: [] });
  };


  return (
    <div className="w-2/4 flex justify-center">
        <form onSubmit={handleSubmit} className="flex flex-col bg-gray-800 p-4">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className="border-2 border-gray-500 rounded-full p-1 text-white"
          />

          <label htmlFor="emoji" className="mt-5">
            Emoji
          </label>
          <select
            name="emoji"
            className="border-2 border-gray-500 rounded-full p-2"
          >
            <option value="🏠">🏠</option>
            <option value="🏢">🏢</option>
          </select>

          <button type="submit" className="p-2 rounded-full bg-gray-400 mt-4">
            Save
          </button>
        </form>

        <div className="flex flex-row">
          {boards.map((board) => (
            <div
              key={board.id}
              className="p-4 bg-gray-600 rounded-full cursor-pointer"
              onClick={() => setSelectedBoard(board)}
            >
              {board.name}
            </div>
          ))}
        </div>
      </div>
  )
}