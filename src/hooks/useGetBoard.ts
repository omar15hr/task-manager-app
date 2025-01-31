import { useEffect, useState } from "react";
import { Board } from "../interfaces/types";

export const useGetBoards = () => {
    const [boards, setBoards] = useState<Board[]>([]);
    const boardUrl = 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/list.json';

    useEffect( () => {
      fetch(boardUrl)
        .then(response => response.json())
        .then(data => setBoards(data))
    }, []);

    return { boards, setBoards };
  }