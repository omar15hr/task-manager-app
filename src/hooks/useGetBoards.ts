import { useEffect, useState } from "react";
import { Board } from "../interfaces/types";

export const useGetBoards = () => {
   const [boards, setBoards] = useState<Board[]>([]);
   const [loading, setLoading] = useState(true);
  
    
    useEffect(() => {
      setLoading(true);
      fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/4-frontend-libaries/challenges/group_1/data/task-manager/list.json")
        .then(response => response.json())
        .then(data => setBoards(data))
        .finally(() => setLoading(false));
    }, []);

    return {boards, loading};
};