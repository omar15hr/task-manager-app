export interface Board {
  name:  string;
  emoji: string;
  color: string;
  id:    number;
  link:  string;
}
export interface BoardData {
  id:    number;
  tasks: Task[];
}

export interface Task {
  id:         number;
  title:      string;
  status:     string;
  background: null | string;
  tags:       string[];
}
