import { useEffect } from "react";
import logos from "../../assets/emojis/logos";
import { CancelSvg, CheckSvg } from "../../assets/svgs/Svg";

interface BoardFormProps {
  handleSubmit: (event: React.FormEvent) => void;
  setEmoji: (emoji: string) => void;
  onClose: () => void;
}

export function BoardForm({ handleSubmit, setEmoji, onClose }: BoardFormProps) {
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if ((event.target as Element).id === "modal-overlay") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, [onClose]);

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 flex items-center justify-center bg-[#000000b4]"
    >
      <div className="bg-[#42474e] p-6 rounded-lg shadow-lg relative w-[90%] max-w-[400px] sm:w-[400px]">

        <div className="flex flex-col items-center justify-center">
          <h1>New Board</h1>
          <button
            onClick={onClose}
            className="absolute top-2 right-2 text-white"
          >
            <CancelSvg size={25} />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="name" className="text-[#98a3b3]">
            Name
          </label>
          <input
            type="text"
            name="name"
            className="border-2 border-gray-500 rounded-full p-2 text-white mt-1"
          />

          <label htmlFor="emoji" className="mt-5 text-[#98a3b3]">
            Emoji
          </label>
          <div className="flex flex-wrap border-2 border-gray-500 rounded-xl p-4 bg-no-repeat gap-1">
            {logos.map((logo) => (
              <div
                key={logo}
                className="flex flex-row"
                onClick={() => setEmoji(logo)}
              >
                <img
                  src={logo}
                  alt={logo}
                  className="w-10 h-10 border-2 border-gray-500 rounded-full hover:border-white hover:border-3"
                />
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-4">
            <button
              type="submit"
              className="flex flex-row gap-2 cursor-pointer items-center justify-center p-2 rounded-full bg-[#4063EE] w-32 hover:shadow-lg"
            >
              <CheckSvg size={25} />
              <span>Save</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex flex-row gap-2 cursor-pointer items-center justify-center p-2 rounded-full bg-red-400 w-32 hover:shadow-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
