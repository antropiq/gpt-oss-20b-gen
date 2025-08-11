import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import type { FC, ChangeEvent } from 'react';
import { useState, useEffect } from 'react';
import type { TaskItem } from '../types/TaskItem';

type TaskItemEditorProps = {
  open: boolean;
  onClose: () => void;
  onSave: (task: TaskItem) => void;
  task?: TaskItem; // undefined for new task
};

const TaskItemEditor: FC<TaskItemEditorProps> = ({ open, onClose, onSave, task }) => {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  useEffect(() => {
    if (task) {
      setDescription(task.description);
      setDueDate(task.dueDate);
    } else {
      setDescription('');
      setDueDate('');
    }
  }, [task]);

  const handleSave = () => {
    const newTask: TaskItem = {
      id: task?.id ?? '',
      description,
      dueDate,
      isDone: task?.isDone ?? false,
    };
    onSave(newTask);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{task ? 'Edit Task' : 'New Task'}</DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
        <TextField
          label="Description"
          value={description}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
          fullWidth
        />
        <TextField
          label="Due Date"
          type="date"
          value={dueDate}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setDueDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskItemEditor;
