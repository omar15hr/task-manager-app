import { TaskColumn } from "./TaskColumn";

interface ContentProps {
  isSidebarOpen: boolean;
}

const column = [
  { id: 1, title: "Backlog" },
  { id: 2, title: "In Progress" },
  { id: 3, title: "In Review" },
  { id: 4, title: "Completed" },
];

export default function TaskBoard({ isSidebarOpen }: ContentProps) {
  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-4 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-3 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl">
        <div className="flex gap-6 p-3">
          {column.map(({ id, title }) => (
            <TaskColumn key={id} title={title} />
          ))}
        </div>
      </div>
    </div>
  );
}
