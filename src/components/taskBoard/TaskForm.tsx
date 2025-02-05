import { useBoardsActions } from "../../hooks/useBoardsActions";
import { CheckSvg, CloseSvg } from "../Svg";

interface TaskFormProps {
  selectedBoard: string | null;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
}

export function TaskForm({
  selectedBoard,
  setIsVisible,
  toggleModal,
}: TaskFormProps) {
  const { addTaskToBoard } = useBoardsActions();

  const handleCloseModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsVisible(false);
    }
  };

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
      setIsVisible(false);
    }
  };
  return (
    <form
      onSubmit={onAddTask}
      id="modal-overlay"
      onClick={handleCloseModal}
      className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a4] bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        className="bg-[#2A2D32] p-6 rounded-2xl shadow-lg w-lg min-h-96 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex flex-row items-center justify-between">
        <span className="text-2xl">Task Details</span>
          <div className="flex"><CloseSvg size={24} onClick={toggleModal} /></div>
        </div>
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
          <option className="bg-[#1b1d20] border-none" value="In-Progress">
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
        <select
          name="tags"
          id="tags"
          className="border-2 border-[#3d4249] rounded-2xl p-3 w-full"
        >
          <option className="bg-[#1b1d20] border-none" value="Personal">
            Personal
          </option>
          <option className="bg-[#1b1d20]" value="Back-end">
            Back-end
          </option>
          <option className="bg-[#1b1d20]" value="Design">
            Design
          </option>
          <option className="bg-[#1b1d20]" value="Front-end">
            Front-end
          </option>
        </select>
        <div className="flex flex-row gap-3">
          <button
            type="submit"
            className="bg-[#007bff] h-8 rounded-4xl cursor-pointer text-white w-40 flex flex-row gap-2 items-center justify-center"
          >
            Save
            <CheckSvg size={24} />
          </button>
          <button
            type="button"
            onClick={toggleModal}
            className="flex items-center cursor-pointer justify-center p-4 text-white border-2 border-[#3d4249] rounded-4xl h-8 w-32 hover:border-[#363b41]"
          >
            Cancel
          </button>
        </div>
      </div>
    </form>
  );
}
