export interface Task {
  id: string;
  title: string;
  description: string;
  priority: number;
  dueDate: Date;
  completed: boolean;
  userId: string;
}
