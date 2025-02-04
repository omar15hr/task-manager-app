import { BaselineSvg, CloseSvg } from "../Svg";
import {
  DndContext,
  DragEndEvent,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { BoardWithId } from "../../interfaces/types";
import { BoardContainer } from "./BoardContainer";
import NewBoard from "./NewBoard";
import { useState } from "react";
import { NewBoardModal } from "./NewBoardModal";

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  handleBoardId: (id: string) => void;
  handleDragEnd: (event: DragEndEvent) => void;
  boards: BoardWithId[];
  selectedBoardId: string | null;
}

export function Sidebar({
  isOpen,
  toggleSidebar,
  handleBoardId,
  handleDragEnd,
  boards,
  selectedBoardId,
}: SidebarProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBoard, setEditingBoard] = useState<BoardWithId | null>(null);

  const openEditModal = (board: BoardWithId) => {
    setEditingBoard(board);
    setIsModalOpen(true);
  };

  const toggleModal = () => {
    setIsModalOpen(false);
    setEditingBoard(null);
  };

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        delay: 150,
        tolerance: 5,
      },
    })
  );

  return (
    <>
      <nav
        className={`fixed left-0 bottom-0 flex flex-col items-end h-full bg-[#191B1F] pt-6 pb-8 transition-all duration-300 ${
          isOpen ? "w-80" : "w-16"
        }`}
      >
        <button
          type="button"
          className="py-4 px-2 text-2xl text-white hover:text-gray-200"
          onClick={toggleSidebar}
        >
          {isOpen ? <CloseSvg size={24} /> : <BaselineSvg size={24} />}
        </button>
        {isOpen && (
          <div className="px-4 pb-6 self-start w-full">
            <div className="flex flex-col w-full">
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragEnd={handleDragEnd}
              >
                <SortableContext
                  items={boards}
                  strategy={verticalListSortingStrategy}
                >
                  {boards.map((board) => (
                    <BoardContainer
                      key={board.id}
                      board={board}
                      handleBoardId={handleBoardId}
                      selectedBoardId={selectedBoardId}
                      openEditModal={openEditModal} 
                    />
                  ))}
                </SortableContext>
              </DndContext>
              <NewBoard />
            </div>
          </div>
        )}
      </nav>

      {isModalOpen && editingBoard && (
        <NewBoardModal
          setIsVisible={setIsModalOpen}
          toggleModal={toggleModal}
          board={editingBoard}
          isEditing={true}
        />
      )}
    </>
  );
}
