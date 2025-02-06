import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId } from "../../interfaces/types";
import { BoardForm } from "./BoardForm";

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
    <div className="w-1/5 p-4">
      <div className="flex flex-col p-4 h-80 items-center">
        <div className="text-2xl font-bold mb-4">Task Manager</div>
        <div className="flex flex-col gap-2 w-full">
        {boards.map((board) => (
          <div
            key={board.id}
            className="flex flex-row p-2 rounded-full border-2 border-gray-700 hover:bg-gray-700 cursor-pointer w-full"
            onClick={() => setSelectedBoard(board)}
          >
            <div><img src={board.emoji} alt={board.name} className="w-8 h-8" /></div>
            <div>{board.name}</div>
          </div>
        ))}
        </div>
      </div>

      <BoardForm handleSubmit={handleSubmit} />
    </div>
  );
}
