import { useGetTasks } from "../hooks/useGetTasks";
import { Board } from "../interfaces/types";
import { CircleSvg } from "./Svg";

interface Props {
  boardSelected: Board | null;
}

export const TasksList = ({ boardSelected }: Props) => {

  const {  tasks } = useGetTasks({ boardSelected });
  

  const backlogTasks = tasks.filter((task) => task.status === "backlog");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");
  const completedTasks = tasks.filter((task) => task.status === "completed");
  const inReviewTasks = tasks.filter((task) => task.status === "in-review");

  return (
    <main>
      <div className="container">
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#ff0000" />
            <h3>Backlog (2)</h3>
          </div>
          <div className="card-grid">
            {backlogTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <div className="tags">{task.tags}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#F3CD48" />
            <h3>In Progress (3)</h3>
          </div>
          <div className="card-grid">
            {inProgressTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <div className="tags">{task.tags}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#B787F5" />
            <h3>In Review (2)</h3>
          </div>
          <div className="card-grid">
            {inReviewTasks.map((task) => (
              <div className="task-card" key={task.title}>
                <img className="task-img" src={task.background === null ? 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/image-1.jpg': task.background} alt={task.title} />
                <h3>{task.title}</h3>
                <div className="tags">
                  {task.tags.map((tag) => (
                    <span className="tag-item">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col">
          <div className="col-header">
            <CircleSvg size={10} color="#77DC88" />
            <h3>Completed (2)</h3>
          </div>
          <div className="card-grid">
            {completedTasks.map((task) => (
              <div className="task-card" key={task.id}>
                <h3>{task.title}</h3>
                <div className="tags">{task.tags}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};
