import { useEffect, useState } from "react";
import { useUserActions } from "../../hooks/useTasksActions.ts";
import { CheckSvg, CloseSvg } from "../Svg.tsx";
import { Task, TaskWithId } from "../../interfaces/types.ts";

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
  task?: TaskWithId;
  isEditing: boolean;
}

const tags = ["concept", "technical", "front-end", "design"];

export const NewTaskModal = ({
  setIsVisible,
  toggleModal,
  task,
  isEditing,
}: Props) => {
  const [selectedTag, setSelectedTag] = useState<string>(tags[0]);
  const [title, setTitle] = useState<string>("");

  const { addTask, updatedTask } = useUserActions();

  useEffect(() => {
    if (isEditing && task) {
      setTitle(task!.title);
      setSelectedTag(task!.tags[0]);
    }
  }, [isEditing, task]);

  const handleCloseModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsVisible(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) return;

    const updatedData: Partial<TaskWithId> = {
      title: 'New Task',
      background: "",
      status: "Backlog",
      tags: [selectedTag],
    };

    if (isEditing && task) {
      updatedTask(task?.id, updatedData);
    } else {
      const newTask: Task = {
        title: 'New Task',
        tags: [selectedTag],
        background: "",
        status: "Backlog",
      };
      addTask(newTask);
    }

    setIsVisible(false);
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleCloseModal}
      className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a4] bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        className="bg-[#2A2D32] p-6 rounded-2xl shadow-lg w-lg min-h-96 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Task Details</h2>
          <CloseSvg size={24} onClick={toggleModal} />
        </div>
        <div className="flex flex-row items-center justify-center gap-3 border-2 border-[#3d4249] rounded-xl p-4 h-32">
          <button className="bg-[#007bff] rounded-4xl h-[35px] w-[200px] cursor-pointer">Random Background</button>
          <button className="bg-[#ce2828] rounded-4xl h-[35px] w-[100px] cursor-pointer">Remove</button>
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="status" className="text-[#747c83]">Status</label>
          <input
            type="text"
            name="status"
            placeholder="e.g: Default Board"
            value={status} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41] text-sm"
          />
          <label htmlFor="name" className="text-[#747c83]">Tags</label>
          <input
            type="text"
            name="tags"
            placeholder="e.g: Default Board"
            value={tags}
            className="w-full p-3 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41] text-sm"
          />
          <label htmlFor="name" className="text-[#747c83]">Task Title</label>
          <input
            type="text"
            name="title"
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41] text-sm"
          />

          <div className="flex justify-between mt-4 items-center">
            <button
              type="submit"
              className="bg-[#007bff] cursor-pointer h-8 rounded-4xl text-white w-32 flex flex-row gap-2 items-center justify-center"
            >
              <span>{isEditing ? "Save" : "Save"}</span>
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
        </form>
      </div>
    </div>
  );
};
