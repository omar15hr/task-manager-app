export type BoardId = string;
export type TaskId = string;

export interface Board {
  name: string;
  emoji: string;
  tasks: TaskWithId[];
}

export interface BoardWithId extends Board {
  id: BoardId;
}

export interface TaskWithId extends Task {
  id: TaskId;
}

export interface Task {
  title: string;
  status: string;
  background: string | null;
  tag: string;
  columnId: string;
}