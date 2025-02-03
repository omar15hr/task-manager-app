import { useAppSelector } from "../../hooks/store";
import { TaskColumn } from "./TaskColumn";
import { PlusSvg } from "../Svg";

interface ContentProps {
  isSidebarOpen: boolean;
}

export default function TaskBoard({ isSidebarOpen }: ContentProps) {

  const tasks = useAppSelector((state) => state.tasks);

  const backlogTasks = tasks.filter((task) => task.status === "Backlog");
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress");
  const inReviewTasks = tasks.filter((task) => task.status === "In Review");
  const completedTasks = tasks.filter((task) => task.status === "Completed");

  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-4 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-3 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl flex flex-col">
        <div className="flex gap-6 p-3 overflow-y-auto flex-grow">
          <TaskColumn 
            title="Backlog" 
            color="#768CE4" 
            tasks={backlogTasks} 
          />
          <TaskColumn
            title="In Progress"
            color="#FEEF49"
            tasks={inProgressTasks}
          />
          <TaskColumn 
            title="In Review" 
            color="#D784EA" 
            tasks={inReviewTasks} 
          />
          <TaskColumn
            title="Completed"
            color="#80FA9D"
            tasks={completedTasks}
          />
        </div>
        <button className="flex flex-row bg-[#BCD4FD] text-[#2849c2] p-2 rounded-xl w-48 gap-3 items-center justify-center">
          <span>Add new task card</span>
          <PlusSvg size={24} />
        </button>
      </div>
    </div>
  );
}
