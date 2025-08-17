// src/data/task-database.ts
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
import type { TaskItem } from '../types/task-item';

interface TaskDB extends DBSchema {
  tasks: {
    key: string;
    value: TaskItem;
  };
}

class TaskDatabase {
  private dbPromise: Promise<IDBPDatabase<TaskDB>>;

  constructor() {
    this.dbPromise = openDB<TaskDB>('tasks-db', 1, {
      upgrade(db) {
        db.createObjectStore('tasks', { keyPath: 'id' });
      },
    });
  }

  async getAll(): Promise<TaskItem[]> {
    const db = await this.dbPromise;
    return db.getAll('tasks');
  }

  async add(task: TaskItem): Promise<void> {
    const db = await this.dbPromise;
    await db.put('tasks', task);
  }

  async update(task: TaskItem): Promise<void> {
    const db = await this.dbPromise;
    await db.put('tasks', task);
  }

  async delete(id: string): Promise<void> {
    const db = await this.dbPromise;
    await db.delete('tasks', id);
  }
}

export default TaskDatabase;
