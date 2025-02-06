import { useAppSelector } from "../../hooks/store";
import { BoardWithId } from "../../interfaces/types";
import { ColumnContainer } from "./ColumnContainer";

interface BoardProps {
  isSidebarOpen: boolean;
  boardSelected: BoardWithId;
}

export function Board({ isSidebarOpen, boardSelected }: BoardProps) {
  const tasks = useAppSelector((state) =>
    state.boards.find((board) => board.id === boardSelected.id)?.tasks || []
  );

  return (
    <div className="flex flex-row gap-4 p-4">
      {["Backlog", "In Progress", "In Review", "Completed"].map((status) => (
        <ColumnContainer
          key={status}
          status={status}
          tasks={tasks.filter((task) => task.status === status)}
          isSidebarOpen={isSidebarOpen}
        />
      ))}
    </div>
  );
}