import { useState } from "react";
import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId, TaskWithId } from "../../interfaces/types";
import { TaskForm } from "../task/TaskForm";
import { PlusSvg } from "../../assets/svgs/Svg";
import { StartBoard } from "./StartBoard";
import { ColumnContainer } from "./ColumnContainer";

interface BoardProps {
  selectedBoard: BoardWithId | null;
  tasks: TaskWithId[];
  isSidebarOpen: boolean;
}

export function Board({ selectedBoard, tasks, isSidebarOpen }: BoardProps) {
  const [isFormTaskOpen, setIsFormTaskOpen] = useState<boolean>(false);
  const { addTask } = useBoardActions();

  const handleSubmitTask = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const status = formData.get("status") as string;
    const background = formData.get("background") as string | null;
    const tag = formData.get("tag") as string;
    const columnId = selectedBoard!.id;

    if (!selectedBoard || !title || !status || !tag) return;

    addTask({
      id: crypto.randomUUID(),
      title,
      status,
      background,
      tag,
      columnId,
    });

    form.reset();
    setIsFormTaskOpen(false);
  };

  return (
    <div
      className={`flex flex-col transition-all duration-300 h-screen sm:h-auto flex-1 p-4 bg-[#191B1F] 
      ${isSidebarOpen ? "ml-80" : "ml-20 mr-4"} sm:ml-0 sm:w-full`}
    >
      <ColumnContainer tasks={tasks}  />

      {selectedBoard ? (
        <button
          className="flex flex-row gap-2 border-2 border-[#42474e] p-2 rounded-full w-50 h-12 hover:border-[#585f69] hover:shadow-xl cursor-pointer mt-10 items-center justify-center ml-5"
          onClick={() => setIsFormTaskOpen(true)}
        >
          <PlusSvg size={25} />
          <span>Add new task</span>
        </button>
      ) : (
        <StartBoard />
      )}

      {isFormTaskOpen && (
        <TaskForm
          handleSubmitTask={handleSubmitTask}
          onClose={() => setIsFormTaskOpen(false)}
        />
      )}
    </div>
  );
}