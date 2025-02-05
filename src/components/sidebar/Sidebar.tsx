export function Sidebar() {
  return (
    <div className="flex flex-col w-[300px] h-[100vh] p-6 ml-3">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-2xl font-bold">Task Manager</div>
        <div className="text-sm">Manage your boards</div>
      </div>
    </div>
  );
}