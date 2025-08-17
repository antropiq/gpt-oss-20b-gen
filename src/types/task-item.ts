// src/types/task-item.ts
export interface TaskItem {
  id: string; // empty string by default, will be set to a UUID when saved
  description: string;
  dueDate: string; // YYYY-MM-DD format
  isDone: boolean;
}
