// src/components/TaskItemEditor.tsx
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, Box } from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import type { TaskItem } from '../types/task-item';

interface TaskItemEditorProps {
  open: boolean;
  onClose: () => void;
  task?: TaskItem;
  onSave: (task: TaskItem) => void;
}

const TaskItemEditor: React.FC<TaskItemEditorProps> = ({ open, onClose, task, onSave }) => {
  const [description, setDescription] = React.useState(task?.description ?? '');
  const [dueDate, setDueDate] = React.useState<string>(task?.dueDate ?? dayjs().format('YYYY-MM-DD'));

  React.useEffect(() => {
    if (task) {
      setDescription(task.description);
      setDueDate(task.dueDate);
    } else {
      setDescription('');
      setDueDate(dayjs().format('YYYY-MM-DD'));
    }
  }, [task, open]);

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
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <TextField
            label="Description"
            fullWidth
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Box>
        <Box sx={{ mt: 2 }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Due Date"
              value={dayjs(dueDate)}
              onChange={(newValue) =>
                setDueDate(newValue ? newValue.format('YYYY-MM-DD') : dayjs().format('YYYY-MM-DD'))
              }
              slotProps={{
                textField: {
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskItemEditor;
