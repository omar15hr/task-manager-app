export type BoardId = string;

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
  id:         string;
  title:      string;
  status:     string;
  background: null | string;
  tags:       string[];
}
