import { TaskColumn } from "./TaskColumn";

interface ContentProps {
  isSidebarOpen: boolean;
}

export default function TaskBoard({ isSidebarOpen }: ContentProps) {
  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-4 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-6 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl">
        <div className="flex flex-wrap gap-6 items-center justify-center">
          {["Backlog", "In Progress", "In Review", "Completed"].map(
            (status) => (
              <TaskColumn key={status} status={status} />
            )
          )}
        </div>
        
      </div>
    </div>
  );
}
