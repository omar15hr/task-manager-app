export type ColumnId = string | number;
export type TaskId = string | number;

export type Column = {
  id: ColumnId;
  title: string;
}

export interface Task {
  id: TaskId;
  columnId: ColumnId;
  title: string;
  content: string;
}