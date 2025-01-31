import { MoonSvg, SunSvg } from "./Svg";

export const SwitchMode = () => {
  return (
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
  );
};
