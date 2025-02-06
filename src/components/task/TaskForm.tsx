import { useBoardActions } from "../../hooks/useBoardActions";
import { BoardWithId } from "../../interfaces/types";

interface BoardFormProps {
  isTaskFormOpen: boolean;
  setIsTaskFormOpen: (isOpen: boolean) => void;
  boardSelected: BoardWithId;
}

export function TaskForm({
  isTaskFormOpen,
  setIsTaskFormOpen,
  boardSelected,
}: BoardFormProps) {
  const boardId = boardSelected.id;
  const { addTask } = useBoardActions();

  const tags = [
    { id: "1", tag: "Front-end" },
    { id: "2", tag: "Back-end" },
    { id: "3", tag: "Design" },
    { id: "4", tag: "Personal" },
  ];

  const status = [
    { id: "1", statusName: "In Progress" },
    { id: "2", statusName: "In Review" },
    { id: "3", statusName: "Completed" },
    { id: "4", statusName: "Backlog" },
  ];

  if (!isTaskFormOpen) return null;

  const handleClickOutside = (event: React.MouseEvent) => {
    if (!(event.target as HTMLElement).closest(".modal-content")) {
      setIsTaskFormOpen(false);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const title = formData.get("title") as string;
    const selectedTags = formData.get("tags") as string; 
    const selectedStatus = formData.get("status") as string; 

    const newTask = {
      id: crypto.randomUUID(),
      title,
      tags: selectedTags,
      background: null,
      status: selectedStatus,
      columnId: boardId,
    };

    addTask(newTask);
    setIsTaskFormOpen(false);
    form.reset();
  };

  return (
    <div
      onClick={handleClickOutside}
      className="fixed inset-0 bg-[#00000091] flex items-center justify-center z-50"
    >
      <form
        onSubmit={handleSubmit}
        className="bg-[#2A2D32] p-6 rounded-lg shadow-lg max-w-md w-full modal-content"
      >
        <h2 className="text-2xl font-semibold mb-4">Task Details</h2>

        <div className="flex flex-row border-2 border-[#464b53] rounded-xl h-30 gap-2 mb-4 items-center justify-center">
          <button className="bg-[#3459EA] text-white rounded-full p-2 w-50 cursor-pointer">
            Random Background
          </button>
          <button className="bg-red-500 text-white rounded-full p-2 w-30 cursor-pointer">
            Remove
          </button>
        </div>

        <div className="flex flex-col gap-2 mb-4">
          <label htmlFor="title">Task title</label>
          <input
            type="text"
            placeholder="Title"
            name="title"
            className="mb-4 p-2 border-2 border-[#464b53] rounded-xl w-full"
            required
          />
        </div>

        <div className="flex flex-col gap-2 mb-6 w-full">
          <label htmlFor="tags">Tags</label>
          <select
            name="tags"
            className="p-2 border-2 border-[#464b53] rounded-xl w-full"
            required
          >
            {tags.map((tag) => (
              <option key={tag.id} value={tag.tag}>
                {tag.tag}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col gap-2 mb-4 w-full">
          <label htmlFor="status">Status</label>
          <select
            name="status"
            className="p-2 border-2 border-[#464b53] rounded-xl w-full"
            required
          >
            {status.map(({ id, statusName }) => (
              <option key={id} value={statusName}>
                {statusName}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-row gap-2">
          <button
            type="submit"
            className="bg-[#4063EE] text-white px-4 py-2 rounded-full hover:bg-[#4063eebb]"
          >
            <span>Save</span>
          </button>
          <button
            type="button"
            className="border-2 border-[#464b53] hover:bg-[#575e68] text-white px-4 py-2 rounded-full"
            onClick={() => setIsTaskFormOpen(false)}
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}