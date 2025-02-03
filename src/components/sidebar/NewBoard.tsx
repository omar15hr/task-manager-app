import { useState } from "react";
import { CirclePlusSvg } from "../Svg";
import { NewBoardModal } from "./NewBoardModal.tsx";

const NewBoard = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <div
        onClick={toggleModal}
        className="flex flex-row gap-3 items-center rounded-4xl py-3 pl-3 pr-4 text-gray-50 hover:bg-[#2A2D32] cursor-pointer"
      >
        <CirclePlusSvg size={26} />
        <span className="text-lg">Add new board</span>
      </div>

      {isVisible && <NewBoardModal setIsVisible={setIsVisible} toggleModal={toggleModal} />}
    </div>
  );
};

export default NewBoard;
