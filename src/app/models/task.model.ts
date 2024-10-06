export interface Task {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  deadline: Date;
}

export interface TaskDTO {
  id?: string;
  title: string;
  description: string;
  completed?: boolean;
  deadline: string;
}
