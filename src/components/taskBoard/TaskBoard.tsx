import { useState } from "react";
import { BoardWithId } from "../../interfaces/types";
import { TaskForm } from "./TaskForm";
import { PlusSvg } from "../Svg";

interface ContentProps {
  isSidebarOpen: boolean;
  selectedBoard: string | null;
  boards: BoardWithId[];
}

export function TaskBoard({
  isSidebarOpen,
  selectedBoard,
  boards,
}: ContentProps) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  const boardSelected = boards.find((board) => board.id === selectedBoard);

  const backlogTask = boardSelected?.tasks.filter(
    (task) => task.status === "Backlog"
  );
  const inProgressTask = boardSelected?.tasks.filter(
    (task) => task.status === "In-Progress"
  );
  const inReviewTask = boardSelected?.tasks.filter(
    (task) => task.status === "In-Review"
  );
  const completedTask = boardSelected?.tasks.filter(
    (task) => task.status === "Completed"
  );

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
              <div
                className={`flex flex-col gap-3 items-center ${
                  isSidebarOpen ? "w-64" : "w-80"
                } h-[calc(100vh-2rem)] overflow-auto`}
              >
                <h1>Backlog</h1>
                {backlogTask?.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#1c1e22] rounded-2xl flex flex-col gap-3 p-4 w-full"
                  >
                    <p>{task.title}</p>
                    <p className="bg-blue-300 rounded-4xl px-2 py-1 text-xs w-20 text-blue-900">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`flex flex-col gap-3 items-center ${
                  isSidebarOpen ? "w-64" : "w-80"
                } h-[calc(100vh-2rem)] overflow-auto`}
              >
                <h1>In Progress</h1>
                {inProgressTask?.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#1c1e22] rounded-2xl flex flex-col gap-3 p-4 w-full"
                  >
                    <p>{task.title}</p>
                    <p className="bg-blue-300 rounded-4xl px-2 py-1 text-xs w-20 text-blue-900">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`flex flex-col gap-3 items-center ${
                  isSidebarOpen ? "w-64" : "w-80"
                } h-[calc(100vh-2rem)] overflow-auto`}
              >
                <h1>In Review</h1>
                {inReviewTask?.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#1c1e22] rounded-2xl flex flex-col gap-3 p-4 w-full"
                  >
                    <p>{task.title}</p>
                    <p className="bg-blue-300 rounded-4xl px-2 py-1 text-xs w-20 text-blue-900">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>

              <div
                className={`flex flex-col gap-3 items-center ${
                  isSidebarOpen ? "w-64" : "w-80"
                } h-[calc(100vh-2rem)] overflow-auto`}
              >
                <h1>Completed</h1>
                {completedTask?.map((task) => (
                  <div
                    key={task.id}
                    className="bg-[#1c1e22] rounded-2xl flex flex-col gap-3 p-4 w-full"
                  >
                    <p>{task.title}</p>
                    <p className="bg-blue-300 rounded-4xl px-2 py-1 text-xs w-20 text-blue-900">
                      {task.status}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>Selecciona un board para agregar tareas</div>
          )}
        </div>
      </div>
    </div>
  );
}
