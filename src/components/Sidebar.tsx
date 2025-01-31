
import { CirclePlusSvg } from "./Svg";
import { Board } from "../interfaces/types";
import { BoardsList } from "./BoardsList";
import { SwitchMode } from "./SwitchMode";

interface Props {
  setBoardSelected: (board: Board) => void;
}

export const Sidebar = ({ setBoardSelected }: Props) => {

  const handleBoardClick = (board: Board) => {
    setBoardSelected(board);
  };

  return (
    <aside className="aside">
      <header className="header">
        <span className="image">
          <img
            src="https://avatars.githubusercontent.com/u/10199126?v=4"
            alt=""
          />
        </span>

        <span className="project-name">Task Manager App</span>
      </header>

      <BoardsList handleBoardClick={handleBoardClick} />

      <button className="add-board-button">
        <CirclePlusSvg size={20} />
        <span>Add new board</span>
      </button>

      <SwitchMode />
      
    </aside>
  );
};
