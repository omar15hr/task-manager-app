import { TaskWithId } from "../../interfaces/types";
import { TaskCard } from "../task/TaskCard";

interface ColumnContainerProps {
  tasks: TaskWithId[]
}

const columns = [
  { id: "backlog", title: "Backlog", status: "backlog" },
  { id: "in-process", title: "In Process", status: "in-process" },
  { id: "in-preview", title: "In Preview", status: "in-preview" },
  { id: "completed", title: "Completed", status: "completed" },
];

export function ColumnContainer({ tasks }: ColumnContainerProps) {
  return (
    <div className="flex flex-row gap-5 w-full items-center justify-center text-center">
            {columns.map((column) => (
              <div
                key={column.id}
                className="w-70 border-2 rounded-xl border-[#] h-[600px] overflow-y-auto flex flex-col gap-3 items-center p-2"
              >
                <h1 className="p-2 font-bold">{column.title}</h1>
                {tasks
                  .filter(
                    (task) =>
                      task.status === column.status || task.columnId === column.id
                  )
                  .map((task) => (
                    <TaskCard key={task.id} task={task} />
                  ))}
              </div>
            ))}
          </div>
  )
}