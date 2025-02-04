export type BoardId = string;
export type TaskId = string;

export interface Board {
  name:  string;
  emoji: string;
  color: string;
  tasks: Task[];
}

export interface BoardWithId extends Board {
  id: BoardId;
}

export interface Task {
  title:      string;
  status:     string;
  background: null | string;
  tags:       string[];
  boardId:    BoardId;
}

export interface TaskWithId extends Task {
  id: TaskId;
}