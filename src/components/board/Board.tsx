import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId, TaskWithId } from "../../interfaces/types";

interface BoardProps {
  selectedBoard: BoardWithId | null;
  tasks: TaskWithId[];
}

export function Board({ selectedBoard, tasks }: BoardProps) {

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

    addTask({
      id: crypto.randomUUID(),
      title,
      status,
      background,
      tag,
      columnId,
    });
  };

  return (
    <div className="w-2/4 flex justify-center">
        <div className="bg-gray-700"></div>
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
  )
}