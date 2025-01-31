import { useEffect, useState } from "react";
import { Board, BoardData, Task } from "../interfaces/types";

interface Props {
  boardSelected: Board | null;
}

export const useGetTasks = ({ boardSelected }: Props) => {
  const [boardData, setBoardData] = useState<BoardData>({ id: 0, tasks: [] });
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!boardSelected) return;
    fetch(
      `https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-${boardSelected?.id}.json`
    )
      .then((response) => response.json())
      .then((data) => {
        setBoardData(data), setTasks(boardData.tasks);
      })
      .finally(() => setLoading(false));
  }, [boardSelected]);

  return { boardData, tasks, loading };
};
