import { useState } from "react";

interface Props {
  onSelectStatus: (value: string ) => void;
}

export const DropDownStatus = ({ onSelectStatus }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const options = [
    { label: "Backlog", value: "Backlog", color: "#768CE4" },
    { label: "In Progress", value: "In Progress", color: "#FEEF49" },
    { label: "In Review", value: "In Review", color: "#D784EA" },
    { label: "Completed", value: "Completed", color: "#80FA9D" },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
    onSelectStatus(value);
  };

  return (
    <div className="relative inline-block ">
      <button
        className="text-left w-full p-3 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41] text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || options[0].label}
      </button>

      {isOpen && (
        <div className="top-100 left-0 w-full bg-[#191B1F] rounded-2xl shadow-lg z-1 flex flex-col gap-2 p-3">
          {options.map((option) => (
            <div
              key={option.value}
              className="cursor-pointer p-2 rounded-4xl hover:bg-[#2A2D32] flex flex-row gap-2 items-center"
              onClick={() => handleSelect(option.value, option.label)}
            >
              <span
                className={`h-[7px] w-[7px] rounded-full`}
                style={{ backgroundColor: option.color, color: option.color }}
              ></span>
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
