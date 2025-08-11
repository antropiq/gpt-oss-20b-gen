export type TaskItem = {
  id: string; // UUID
  description: string;
  dueDate: string; // YYYY-MM-DD
  isDone: boolean;
};

export const defaultTask: TaskItem = {
  id: '',
  description: '',
  dueDate: '',
  isDone: false,
};
