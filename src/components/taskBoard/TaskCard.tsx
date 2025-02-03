import { Task } from "../../interfaces/types";

interface Props {
  tasks: Task[];
}

const tagColors: { [key: string]: string } = {
  "concept": "bg-red-400 text-red-900",
  "technical": "bg-yellow-400 text-yellow-900",
  "front-end": "bg-green-400 text-green-900",
  "design": "bg-gray-400 text-gray-900",
};

export const TaskCard = ({ tasks }: Props) => {
  return (
    <div className="">
      {tasks.map((task) => (
        <div className="bg-[#191B1F] w-64 h-40 rounded-2xl p-3 gap-2 flex flex-col">
          {task.background && (
            <img
              className="w-32 h-[60px] object-cover rounded-2xl"
              src={task.background}
              alt="background"
            />
          )}
          <h2 className="text-xl font-bold">{task.title}</h2>
          <span className="flex flex-row gap-2 items-center">
            {task.tags.map((tag) => (
              <span className={`rounded-md p-1 px-2 text-[10px] flex flex-row gap-2 items-center justify-center ${tagColors[tag] || tagColors.default}`}>
                {tag}
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
};
