import { ClipboardSvg } from "../../assets/svgs/Svg";

export function StartBoard() {
  return (
    <div className="flex flex-row gap-4 p-4 items-center justify-center bg-[#2A2D32] h-screen opacity-50">
      <ClipboardSvg size={64} />
      <span className="text-4xl font-bold">Select a board</span>
    </div>
  );
}
