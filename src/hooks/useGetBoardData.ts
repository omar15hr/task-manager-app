import { useEffect, useState } from "react";
import { BoardData } from "../interfaces/types";

export const useGetBoardData = () => {
    const [boardData, setBoardData] = useState<BoardData[]>([]);
    const boardUrl = 'https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/board-1.json';

    useEffect( () => {
      fetch(boardUrl)
        .then(response => response.json())
        .then(data => setBoardData(data))
    }, []);

    return { boardData, setBoardData };
  }