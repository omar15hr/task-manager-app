export type BoardId = string;
export type TaskId = string;

export interface Board {
  name: string;
  emoji: string;
  color: string;
  tasks: Task[];
}

export interface BoardWithId extends Board {
  id: BoardId;
}

export interface Task {
  id: string;
  title: string;
  status: string;
  background: string | null;
  tags: string[];
  boardId: BoardId;
}