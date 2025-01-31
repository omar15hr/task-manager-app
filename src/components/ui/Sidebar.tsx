// import { useState } from "react";
import { useGetBoards } from "../../hooks/useGetBoard";
import { MoonSvg, SunSvg, CirclePlusSvg } from "../Svg";

export const Sidebar = () => {
  const { boards } = useGetBoards();

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


      <div className="boards-list">
        {
          boards.map((board) => (
            <li className="menu-list-item" key={board.id}>
              <span className="board-emoji" style={{backgroundColor: board.color}}>{board.emoji}</span>
              <h2>{board.name}</h2>
            </li>
          ))
        }
      </div>

      <button className="add-board-button">
        <CirclePlusSvg size={20} />
        <span>Add new board</span>
      </button>

      <div className="mode-menu">
        <label className="switch">
          <input type="checkbox" />
          <span className="slider">
            <span className="dark">
              <MoonSvg size={20} />
              Dark
            </span>
            <span className="light">
              <SunSvg size={20} />
              Light
            </span>
          </span>
        </label>
      </div>

    </aside>
  );
};
