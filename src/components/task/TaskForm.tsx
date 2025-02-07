import { useEffect } from "react";
import { CancelSvg, CheckSvg } from "../../assets/svgs/Svg";

interface TaskFormProps {
  handleSubmitTask: (event: React.FormEvent) => void;
  onClose: () => void;
}

export function TaskForm({ handleSubmitTask, onClose }: TaskFormProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as Element).id === "modal-overlay") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      id="modal-overlay"
      className="fixed h-screen sm:h-auto inset-0 flex items-center justify-center bg-[#000000b4] z-10"
    >
      <div className="bg-[#42474e] p-6 rounded-lg shadow-lg relative w-[90%] max-w-[400px] sm:w-[400px] mr-4">

        <div className="flex flex-col items-center justify-center">
          <h1>Task Details</h1>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white"
          >
            <CancelSvg size={25} />
          </button>
        </div>
        <form
          onSubmit={handleSubmitTask}
          className="flex flex-col p-4"
        >
          <label htmlFor="title" className="text-[#98a3b3]">
            Background
          </label>
          <input
            type="text"
            name="background"
            className="border-2 border-gray-500 rounded-full p-2 text-white mt-1"
          />

          <label htmlFor="title" className="text-[#98a3b3] mt-5">
            Title
          </label>
          <input
            type="text"
            name="title"
            className="border-2 border-gray-500 rounded-full p-2 text-white mt-1"
          />

          <label htmlFor="status" className="text-[#98a3b3] mt-5">
            Status
          </label>
          <select
            name="status"
            className="border-2 border-gray-500 rounded-full p-2 mt-1"
          >
            <option value="backlog" className="bg-[#383c42]">
              Backlog
            </option>
            <option value="completed" className="bg-[#383c42]">
              Completed
            </option>
            <option value="in-preview" className="bg-[#383c42]">
              In Preview
            </option>
            <option value="in-process" className="bg-[#383c42]">
              In Process
            </option>
          </select>

          <label htmlFor="tag" className="text-[#98a3b3] mt-5">
            Tag
          </label>
          <select
            name="tag"
            className="border-2 border-gray-500 rounded-full p-2 mt-1"
          >
            <option value="front-end" className="bg-[#383c42]">
              Front-end
            </option>
            <option value="back-end" className="bg-[#383c42]">
              Back-end
            </option>
            <option value="back-end" className="bg-[#383c42]">
              Design
            </option>
            <option value="back-end" className="bg-[#383c42]">
              Personal
            </option>
          </select>

          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="flex flex-row gap-2 cursor-pointer items-center justify-center p-2 rounded-full bg-[#4063EE] w-32 hover:shadow-lg"
            >
              <CheckSvg size={25} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex flex-row gap-2 cursor-pointer items-center justify-center p-2 rounded-full bg-red-400 w-32 hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
