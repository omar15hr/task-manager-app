export const TaskColumn = ({ status }: { status: string }) => {
  return (
    <div className="flex flex-col gap-4 w-80 h-[calc(100vh-5rem)]">
      <div className="text-xl font-bold">{status}</div>
      <div className="bg-[#191B1F] rounded-xl p-4 h-24 cursor-pointer flex flex-col gap-5">
        <h4>Task 1</h4>
        <span className="bg-red-200 rounded-md w-auto p-1 px-2 text-[10px] text-red-600 align-bottom self-start">Concept</span>
      </div>
      <button className="bg-[#BCD4FD] text-[#2A4DD0] p-2 rounded-xl w-full">Add new task card</button>

    </div>
  );
};
