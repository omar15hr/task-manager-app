export interface Board {
  id:    string;
  name:  string;
  emoji: string;
  color: string;
  tasks: Task[];
}

export interface Task {
  id:         string;
  title:      string;
  status:     string;
  background: null | string;
  tags:       string[];
}
