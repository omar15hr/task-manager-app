import { useState } from "react";
import { BoardWithId } from "../../interfaces/types";
import { TaskForm } from "./TaskForm";
import { PlusSvg } from "../Svg";
import { TaskColumn } from "./TaskColumn";

interface ContentProps {
  isSidebarOpen: boolean;
  selectedBoard: string | null;
  boards: BoardWithId[];
}

const taskStatuses = {
  Backlog: "bg-emerald-500",
  "In-Progress": "bg-purple-500",
  "In-Review": "bg-blue-500",
  Completed: "bg-yellow-500",
};

export function TaskBoard({
  isSidebarOpen,
  selectedBoard,
  boards,
}: ContentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const toggleModal = () => setIsVisible(!isVisible);

  const boardSelected = boards.find((board) => board.id === selectedBoard);

  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-4 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-3 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl flex flex-col">
        <div className="flex flex-col items-center justify-start mt-5 gap-5 flex-grow">
          {selectedBoard ? (
            <div className="flex flex-row gap-6 w-full items-start justify-start">
              <button
                onClick={toggleModal}
                className="flex flex-row w-50 p-1 cursor-pointer justify-center items-center bg-[#BCD4FD] text-[#1C3DC0] rounded-4xl"
              >
                <PlusSvg size={24} />
                <span>Add new task</span>
              </button>
              {isVisible && (
                <TaskForm
                  selectedBoard={selectedBoard}
                  setIsVisible={setIsVisible}
                  toggleModal={toggleModal}
                />
              )}
              {Object.entries(taskStatuses).map(([status, colorClass]) => (
                
                  <TaskColumn
                    key={status}
                    title={status}
                    boards={boards}
                    selectedBoard={selectedBoard}
                    tasks={boardSelected?.tasks.filter(
                      (task) => task.status === status
                    )}
                    isSidebarOpen={isSidebarOpen}
                    colorClass={colorClass}
                  />
              ))}
            </div>
          ) : (
            <div>Selecciona un board para agregar tareas</div>
          )}
        </div>
      </div>
    </div>
  );
}
