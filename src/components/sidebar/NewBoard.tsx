import { useState, useRef } from "react";
import { CirclePlusSvg } from "../Svg";

const NewBoard = () => {
  const [isVisible, setIsVisible] = useState(false);
  const popoverRef = useRef<HTMLDivElement | null>(null);

  const togglePopover = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div style={{ position: "relative" }}>
      <div
        onClick={togglePopover}
        className="flex flex-row gap-3 items-center rounded-4xl py-3 pl-3 pr-4 text-gray-50 hover:bg-[#2A2D32] cursor-pointer"
      >
        <CirclePlusSvg size={26} />
        <span className="text-lg">Add new board</span>
      </div>

      {isVisible && (
        <div
          ref={popoverRef}
          className="popover-content"
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            backgroundColor: "white",
            border: "1px solid #ccc",
            padding: "10px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            width: "200px",
          }}
        >
          <p className="text-black">Este es un popover de ejemplo.</p>
        </div>
      )}
    </div>
  );
};

export default NewBoard;
