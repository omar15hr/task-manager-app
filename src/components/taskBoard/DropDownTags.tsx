import { useState } from "react";

interface Props {
  onSelect: (value: string ) => void;
}

export const DropDownTags = ({ onSelect }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState<string | null>(null);

  const tags = [
    {
      label: "concept",
      value: "concept",
      color: "bg-red-400",
      colorText: "text-red-900",
      colorHover: "bg-red-300",
    },
    {
      label: "technical",
      value: "technical",
      color: "bg-yellow-400",
      colorText: "text-yellow-900",
      colorHover: "bg-yellow-300",
    },
    {
      label: "front-end",
      value: "front-end",
      color: "bg-green-400",
      colorText: "text-green-900",
      colorHover: "bg-green-300",
    },
    {
      label: "design",
      value: "design",
      color: "bg-gray-400",
      colorText: "text-gray-900",
      colorHover: "bg-gray-300",
    },
  ];

  const handleSelect = (value: string, label: string) => {
    setSelectedValue(label);
    setIsOpen(false);
    onSelect(value);
  };

  return (
    <div className="relative inline-block ">
      <button
        className="text-left w-full p-3 rounded-2xl border-2 border-[#3d4249] my-3 focus:border-[#363b41] text-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        {selectedValue || tags[0].label}
      </button>

      {isOpen && (
        <div className="top-100 left-0 w-full bg-[#191B1F] rounded-2xl shadow-lg z-1 flex flex-col gap-2 p-3">
          {tags.map((option) => (
            <div
              key={option.value}
              className={`cursor-pointer p-2 rounded-xl hover:${option.colorHover} flex flex-row gap-2 items-center ${option.color} ${option.colorText}`}
              onClick={() => handleSelect(option.value, option.label)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
