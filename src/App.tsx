import { useEffect, useState } from "react";
import { useAppSelector } from "./hooks/store";
import { useBoardActions } from "./hooks/useBoardActions";
import { BoardWithId } from "./interfaces/types";

export default function App() {
  const boards = useAppSelector((state) => state.boards);
  const [selectedBoard, setSelectedBoard] = useState<BoardWithId | null>(null);

  const { addBoard, addTask } = useBoardActions();

  useEffect(() => {
    if (selectedBoard) {
      const updatedBoard = boards.find((board) => board.id === selectedBoard.id);
      if (updatedBoard) {
        setSelectedBoard(updatedBoard);
      }
    }
  }, [boards]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const name = formData.get("name") as string;
    const emoji = formData.get("emoji") as string;

    addBoard({ name, emoji, tasks: [] });
  };

  const handleSubmitTask = (event: React.FormEvent) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const status = formData.get("status") as string;
    const background = formData.get("background") as string | null;
    const tag = formData.get("tag") as string;
    const columnId = selectedBoard!.id;

    addTask({
      id: crypto.randomUUID(),
      title,
      status,
      background,
      tag,
      columnId,
    });
  };

  const tasks = selectedBoard ? selectedBoard.tasks : [];

  return (
    <div className="flex flex-row h-[100vh] overflow-hidden justify-center w-full">
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

      <div className="w-2/4 flex justify-center">
        <div className="bg-gray-700">
        </div>
        <div className="flex flex-col">
          {tasks.map((task) => (
            <div key={task.id} className="flex bg-gray-700 rounded-full p-4">
              {task.title}
            </div>
          ))}
        </div>
        <form
          onSubmit={handleSubmitTask}
          className="flex flex-col bg-gray-800 p-4"
        >
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            className="border-2 border-gray-500 rounded-full p-1 text-white"
          />

          <label htmlFor="status" className="mt-5">
            Status
          </label>
          <select
            name="status"
            className="border-2 border-gray-500 rounded-full p-2"
          >
            <option value="backlog" className="bg-gray-700">
              Backlog
            </option>
            <option value="completed" className="bg-gray-700">
              Completed
            </option>
          </select>

          <label htmlFor="tag" className="mt-5">
            Tag
          </label>
          <select
            name="tag"
            className="border-2 border-gray-500 rounded-full p-2"
          >
            <option value="front-end" className="bg-gray-700">
              Front-end
            </option>
            <option value="back-end" className="bg-gray-700">
              Back-end
            </option>
          </select>

          <button type="submit" className="p-2 rounded-full bg-gray-400 mt-4">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
