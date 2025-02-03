import { useEffect, useState } from "react";
import logos from "../../assets/emojis/logos.ts";
import { useUserActions } from "../../hooks/useBoardsActions.ts";
import { CheckSvg, CloseSvg } from "../Svg.tsx";
import { Board, BoardWithId } from "../../interfaces/types.ts";

interface Props {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
  board?: BoardWithId;
  isEditing: boolean;
}

export const NewBoardModal = ({
  setIsVisible,
  toggleModal,
  board,
  isEditing,
}: Props) => {
  const [selectedEmoji, setSelectedEmoji] = useState<string>(logos[0]);
  const [name, setName] = useState<string>("");

  const { addBoard, updatedBoard } = useUserActions();

  useEffect(() => {
    if (isEditing && board) {
      setName(board.name);
      setSelectedEmoji(board.emoji);
    }
  }, [isEditing, board]);

  const handleCloseModal = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      setIsVisible(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) return;

    const updatedData: Partial<BoardWithId> = {
      name,
      emoji: selectedEmoji,
    };

    if (isEditing && board) {
      updatedBoard(board.id, updatedData);
    } else {
      const newBoard: Board = {
        name,
        emoji: selectedEmoji,
        color: "",
        tasks: [],
      };
      addBoard(newBoard);
    }

    setIsVisible(false);
  };

  return (
    <div
      id="modal-overlay"
      onClick={handleCloseModal}
      className="fixed top-0 left-0 right-0 bottom-0 bg-[#000000a4] bg-opacity-50 flex justify-center items-center z-50"
    >
      <div
        className="bg-[#2A2D32] p-6 rounded-2xl shadow-lg w-lg min-h-96 flex flex-col gap-6"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">{isEditing ? "Edit Board" : "New Board"}</h2>
          <CloseSvg size={24} onClick={toggleModal} />
        </div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="name">Board name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g: Default Board"
            value={name} 
            onChange={(e) => setName(e.target.value)}
            className="w-full p-4 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41]"
          />
          <div>
            <h2 className="text-md">Logo</h2>
            <div className="flex flex-wrap gap-3 p-4">
              {logos.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt="logo"
                  className={`w-10 h-10 rounded-full hover:border-blue-500 border-4 cursor-pointer ${
                    selectedEmoji === logo ? "border-4 border-blue-500" : ""
                  }`}
                  onClick={() => setSelectedEmoji(logo)}
                />
              ))}
            </div>
          </div>

          <div className="flex justify-between mt-4 items-center">
            <button
              type="submit"
              className="bg-[#007bff] h-8 rounded-4xl cursor-pointer text-white w-40 flex flex-row gap-2 items-center justify-center"
            >
              <span>{isEditing ? "Save Changes" : "Create Board"}</span>
              <CheckSvg size={24} />
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="flex items-center cursor-pointer justify-center p-4 text-white border-2 border-[#3d4249] rounded-4xl h-8 w-32 hover:border-[#363b41]"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
