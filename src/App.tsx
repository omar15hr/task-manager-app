import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAppSelector } from "./hooks/store";
import { Sidebar } from "./components/sidebar/Sidebar";
import { useBoardsActions } from "./hooks/useBoardsActions";
import { BoardWithId } from "./interfaces/types";

export default function App() {
  const boards = useAppSelector((state) => state.boards);

  const [show, setShow] = useState(true);
  const [selectedBoard, setSelectedBoard] = useState<string | null>(null);

  const { updatedOrder } = useBoardsActions();

  const toggleSidebar = () => {
    setShow(!show);
  };

  const handleBoardId = (id: string) => {
    setSelectedBoard(id);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = boards.findIndex((board) => board.id === active.id);
      const newIndex = boards.findIndex((board) => board.id === over.id);

      const newOrder = arrayMove(boards, oldIndex, newIndex);
      updatedOrder(newOrder);
    }
  };

  return (
    <div className="flex">
      <Sidebar
        isOpen={show}
        toggleSidebar={toggleSidebar}
        handleBoardId={handleBoardId}
        handleDragEnd={handleDragEnd}
        boards={boards}
        selectedBoardId={selectedBoard}
      />

      <TaskBoard
        isSidebarOpen={show}
        selectedBoard={selectedBoard}
        boards={boards}
      />
    </div>
  );
}

interface ContentProps {
  isSidebarOpen: boolean;
  selectedBoard: string | null;
  boards: BoardWithId[];
}

function TaskBoard({ isSidebarOpen, selectedBoard, boards }: ContentProps) {
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
          <div className="flex flex-row gap-6 w-full items-start justify-start">
            {/* Backlog Column */}
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

            {/* In Progress Column */}
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

            {/* In Review Column */}
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

            {/* Completed Column */}
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
          <TaskForm selectedBoard={selectedBoard} />
          </div>

          {/* Formulario debajo de las columnas */}
        </div>
      </div>
    </div>
  );
}

interface TaskFormProps {
  selectedBoard: string | null;
}

export function TaskForm({ selectedBoard }: TaskFormProps) {
  const { addTaskToBoard } = useBoardsActions();

  const onAddTask = (e: React.FormEvent) => {
    e.preventDefault();

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const status = formData.get("status") as string;
    const tags = formData.get("tags") as string;

    if (!title || !status || !tags) return;
    if (!selectedBoard) return;

    if (selectedBoard) {
      const newTask = {
        id: crypto.randomUUID(),
        title: title,
        status: status,
        background: null,
        tags: [tags],
        boardId: selectedBoard,
      };

      addTaskToBoard(selectedBoard, newTask);
    }
  };
  return (
    <form
      onSubmit={onAddTask}
      className="flex flex-col bg-[#1b1d20] rounded-2xl p-4 gap-3 w-64"
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="border-2 border-[#3d4249] rounded-2xl p-3 w-full"
      />
      <label htmlFor="status">Status</label>
      <select
        name="status"
        id="status"
        className="border-2 border-[#3d4249] rounded-2xl p-3 w-full"
      >
        <option className="bg-[#1b1d20]" value="In-Progress">
          In Progress
        </option>
        <option className="bg-[#1b1d20]" value="In-Review">
          In Review
        </option>
        <option className="bg-[#1b1d20]" value="Backlog">
          Backlog
        </option>
        <option className="bg-[#1b1d20]" value="Completed">
          Completed
        </option>
      </select>
      <label htmlFor="tags">Tags</label>
      <input
        type="text"
        name="tags"
        placeholder="Tags"
        className="border-2 border-[#3d4249] rounded-2xl p-3 w-full"
      />
      <button className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md">
        Añadir tarea
      </button>
    </form>
  );
}


