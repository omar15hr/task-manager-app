import { useGetBoards } from "../hooks/useGetBoards";
import { Board } from "../interfaces/types";

interface Props {
  handleBoardClick: (board: Board) => void;
}

export const BoardsList = ({ handleBoardClick }: Props) => {
  const { boards, loading } = useGetBoards();

  return (
    <div className="boards-list">
      {loading && <h2 className="text-2xl text-center">Loading...</h2>}
      {boards?.map((board) => (
        <li
          className="menu-list-item"
          key={board.id}
          onClick={() => handleBoardClick(board)}
        >
          <span
            className="board-emoji"
            style={{ backgroundColor: board.color }}
          >
            {board.emoji}
          </span>
          <h2>{board.name}</h2>
        </li>
      ))}
    </div>
  );
};
