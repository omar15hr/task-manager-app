import NewTask from "./NewTask";

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
      <div className="p-3 bg-[#2A2D32] h-[calc(100vh-2rem)] rounded-2xl flex flex-col">
        
       <NewTask />
      </div>
    </div>
  );
}
