import { useState } from "react";
import { PlusSvg } from "../Svg";
import { NewTaskModal } from "./NewTaskModal";


const NewTask = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleModal = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      <button onClick={toggleModal} className="flex flex-row bg-[#BCD4FD] text-[#2849c2] p-2 rounded-xl w-48 gap-3 items-center justify-center cursor-pointer">
          <span>Add new task card</span>
          <PlusSvg size={24} />
        </button>
      

      {isVisible && (
        <NewTaskModal
          setIsVisible={setIsVisible}
          toggleModal={toggleModal}
          isEditing={false}
        />
      )}
    </div>
  );
};

export default NewTask;
