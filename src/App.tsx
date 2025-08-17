// src/App.tsx
import React, { useState, useEffect } from 'react';
import ApplicationBar from './components/ApplicationBar';
import TaskItemEditor from './components/TaskItemEditor';
import ConfirmDialog from './components/ConfirmDialog';
import TaskList from './components/TaskList';
import TaskDatabase from './data/task-database';
import type { TaskItem } from './types/task-item';
import { v4 as uuidv4 } from 'uuid';

const db = new TaskDatabase();

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [filterDone, setFilterDone] = useState<boolean>(false);
  const [editorOpen, setEditorOpen] = useState<boolean>(false);
  const [editingTask, setEditingTask] = useState<TaskItem | undefined>(undefined);
  const [confirmOpen, setConfirmOpen] = useState<boolean>(false);
  const [taskToDelete, setTaskToDelete] = useState<string>('');

  // Load tasks on mount
  useEffect(() => {
    const loadTasks = async () => {
      const all = await db.getAll();
      setTasks(all);
    };
    loadTasks();
  }, []);

  const handleAddOpen = () => {
    setEditingTask(undefined);
    setEditorOpen(true);
  };

  const handleEditOpen = (task: TaskItem) => {
    setEditingTask(task);
    setEditorOpen(true);
  };

  const handleEditorClose = () => {
    setEditorOpen(false);
  };

  const handleSaveTask = async (task: TaskItem) => {
    if (!task.id) {
      // new task
      const newTask = { ...task, id: uuidv4() };
      await db.add(newTask);
      setTasks((prev) => [...prev, newTask]);
    } else {
      // existing task
      await db.update(task);
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    }
  };

  const handleToggleDone = async (id: string, done: boolean) => {
    const updated = tasks.find((t) => t.id === id);
    if (!updated) return;
    const newTask = { ...updated, isDone: done };
    await db.update(newTask);
    setTasks((prev) => prev.map((t) => (t.id === id ? newTask : t)));
  };

  const handleDelete = (id: string) => {
    setTaskToDelete(id);
    setConfirmOpen(true);
  };

  const confirmDelete = async () => {
    await db.delete(taskToDelete);
    setTasks((prev) => prev.filter((t) => t.id !== taskToDelete));
    setConfirmOpen(false);
    setTaskToDelete('');
  };

  const cancelDelete = () => {
    setConfirmOpen(false);
    setTaskToDelete('');
  };

  const filteredTasks = filterDone ? tasks : tasks.filter((t) => !t.isDone);

  return (
    <>
      <ApplicationBar
        onAdd={handleAddOpen}
        filterDone={filterDone}
        onFilterChange={setFilterDone}
      />
      <TaskList
        tasks={filteredTasks}
        onToggleDone={handleToggleDone}
        onEdit={handleEditOpen}
        onDelete={handleDelete}
      />
      <TaskItemEditor
        open={editorOpen}
        onClose={handleEditorClose}
        task={editingTask}
        onSave={handleSaveTask}
      />
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Task"
        content="Are you sure you want to delete this task?"
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
    </>
  );
};

export default App;
