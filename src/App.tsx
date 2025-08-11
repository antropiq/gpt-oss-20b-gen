import { useState } from 'react';
import ApplicationBar from './components/ApplicationBar';
import TaskList from './components/TaskList';
import TaskItemEditor from './components/TaskItemEditor';
import type { TaskItem } from './types/TaskItem';
import { v4 as uuidv4 } from 'uuid';

const App = () => {
  const [tasks, setTasks] = useState<TaskItem[]>([]);
  const [showDoneFilter, setShowDoneFilter] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskItem | null>(null);

  const handleAddTask = () => {
    setEditingTask(null);
    setEditorOpen(true);
  };

  const handleEditTask = (task: TaskItem) => {
    setEditingTask(task);
    setEditorOpen(true);
  };

  const handleSaveTask = (task: TaskItem) => {
    if (editingTask) {
      // Update existing
      setTasks((prev) =>
        prev.map((t) => (t.id === task.id ? { ...t, ...task } : t))
      );
    } else {
      // Create new
      const newTask: TaskItem = {
        ...task,
        id: uuidv4(),
        isDone: false,
      };
      setTasks((prev) => [...prev, newTask]);
    }
  };

  const handleDeleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleToggleDone = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t))
    );
  };

  const filteredTasks = showDoneFilter
    ? tasks.filter((t) => t.isDone)
    : tasks;

  return (
    <>
      <ApplicationBar
        onAddTask={handleAddTask}
        showDoneFilter={showDoneFilter}
        setShowDoneFilter={setShowDoneFilter}
      />
      <TaskList
        tasks={filteredTasks}
        onToggleDone={handleToggleDone}
        onDelete={handleDeleteTask}
        onEdit={handleEditTask}
      />
      <TaskItemEditor
        open={editorOpen}
        onClose={() => setEditorOpen(false)}
        onSave={handleSaveTask}
        task={editingTask ?? undefined}
      />
    </>
  );
};

export default App;
