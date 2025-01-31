// import { useState } from "react";
import { useGetBoards } from "../../hooks/useGetBoard";
import { ArrowSvg, MoonSvg, SunSvg } from "../Svg";

export const Sidebar = () => {
  const { boards } = useGetBoards();
  // const [mode, setMode] = useState(false);

  return (
    <aside>

      <header className="header">
        <span className="image">
          <img
            src="https://avatars.githubusercontent.com/u/10199126?v=4"
            alt=""
          />
        </span>

        <span className="project-name">Task Manager App</span>
      </header>
      
    </aside>
  );
};
