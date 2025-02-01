interface ContentProps {
  isSidebarOpen: boolean;
}

export default function TaskBoard({ isSidebarOpen }: ContentProps) {
  return (
    <div
      className={`flex-1 transition-all duration-300 bg-[#191B1F] h-screen overflow-hidden p-6 ${
        isSidebarOpen ? "ml-80" : "ml-16"
      }`}
    >
      <div className="p-6 bg-[#2A2D32] h-[calc(100vh-3rem)] rounded-2xl">
        <h1 className="text-2xl font-bold">Taskboard</h1>
        <p>This is the taskboard content. It adjusts based on the sidebar state.</p>
      </div>
    </div>
  );
}