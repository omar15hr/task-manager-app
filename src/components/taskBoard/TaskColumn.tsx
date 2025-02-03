import { TaskCard } from "./TaskCard";

interface Props {
  title: string;
}

export const TaskColumn = ({title}: Props) => {
  return (
    <div className="flex flex-col gap-4 w-80 h-[calc(100vh-5rem)]">
      <h1>{title}</h1>
       <TaskCard />
    </div>
  );
};
