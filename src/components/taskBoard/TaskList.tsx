import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { BoardData, Task } from "../../interfaces/types";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useTasksActions } from "../../hooks/useTasksActions";
import { useState } from "react";
import { NewTaskModal } from "./NewTaskModal";

interface TaskListProps {
  boardId: string | null;
  tasks: BoardData[];
}

const columns = [
  { id: "backlog", name: "Backlog", color: "red" },
  { id: "in-progress", name: "In Progress", color: "green" },
  { id: "in-review", name: "In Review", color: "blue" },
  { id: "completed", name: "Completed", color: "purple" },
];

export function TaskList({ boardId, tasks }: TaskListProps) {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!boardId) return <p>Selecciona un board para ver sus tareas</p>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { updateOrder } = useTasksActions();
  const board = tasks.find((task) => task.id === boardId);
  const boardTasks = tasks.find((task) => task.id === boardId)?.tasks || [];

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = tasks.findIndex((board) => board.id === active.id);
      const newIndex = tasks.findIndex((board) => board.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        const newOrder = arrayMove(board!.tasks, oldIndex, newIndex);
        updateOrder(boardId, newOrder);
      }
    }
  };

  const taskColumns = columns.map((column) => ({
    ...column,
    tasks: boardTasks.filter((task) => task.status === column.id),
  }));

  return (
    <div className="flex flex-row gap-4 p-4 rounded-md w-full">
      <DndContext onDragEnd={handleDragEnd}>
        {taskColumns.map((column) => (
          <div
            key={column.id}
            className="bg-[#1e2024] p-4 rounded-md w-80 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-block w-2 h-2 bg-${column.color}-500 rounded-full`}
              ></span>
              <h1>{column.name}</h1>
            </div>

            <SortableContext
              items={column.tasks}
              strategy={verticalListSortingStrategy}
            >
              {column.tasks.length > 0 ? (
                column.tasks.map((task) => (
                  <div
                    key={task.id}
                    id={`${column.id}-${task.id}`}
                    className="p-2 bg-white rounded shadow mb-2 text-black cursor-pointer"
                    onClick={() => handleTaskClick(task)}
                  >
                    <div>{task.title}</div>
                    <div>{task.status}</div>
                  </div>
                ))
              ) : (
                <p className="text-black">No hay tareas</p>
              )}
            </SortableContext>
          </div>
        ))}
      </DndContext>
      {isModalOpen && selectedTask && (
        <NewTaskModal
          setIsVisible={setIsModalOpen}
          toggleModal={() => setIsModalOpen(false)}
          task={selectedTask}
          isEditing={true}
          boardId={boardId}
        />
      )}
    </div>
  );
}

// {boardTasks.length > 0 ? (
//   boardTasks.map((task) => (
//     <div
//       key={task.id}
//       className="p-2 bg-white rounded shadow mb-2 text-black"
//     >
//       <div>{task.title}</div>
//       <div>{task.status}</div>
//     </div>
//   ))
// ) : (
//   <p className="text-black">No hay tareas</p>
// )}
