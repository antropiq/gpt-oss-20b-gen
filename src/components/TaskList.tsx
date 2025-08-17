// src/components/TaskList.tsx
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Switch,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { TaskItem } from '../types/task-item';

interface TaskListProps {
  tasks: TaskItem[];
  onToggleDone: (id: string, done: boolean) => void;
  onEdit: (task: TaskItem) => void;
  onDelete: (id: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleDone, onEdit, onDelete }) => (
  <TableContainer component={Paper} sx={{ mt: 2 }}>
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>Is done</TableCell>
          <TableCell>Description</TableCell>
          <TableCell>Due Date</TableCell>
          <TableCell align="right">Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {tasks.map((task) => (
          <TableRow key={task.id}>
            <TableCell>
              <Switch
                checked={task.isDone}
                onChange={(e) => onToggleDone(task.id, e.target.checked)}
                color="primary"
              />
            </TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell align="right">
              <IconButton aria-label="edit" onClick={() => onEdit(task)}>
                <EditIcon />
              </IconButton>
              <IconButton aria-label="delete" onClick={() => onDelete(task.id)}>
                <DeleteIcon />
              </IconButton>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
);

export default TaskList;
