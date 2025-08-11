import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Switch, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import type { FC } from 'react';
import type { TaskItem } from '../types/TaskItem';

type TaskListProps = {
  tasks: TaskItem[];
  onToggleDone: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (task: TaskItem) => void;
};

const TaskList: FC<TaskListProps> = ({ tasks, onToggleDone, onDelete, onEdit }) => {
  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      onDelete(id);
    }
  };

  return (
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
                  onChange={() => onToggleDone(task.id)}
                  color="primary"
                />
              </TableCell>
              <TableCell>{task.description}</TableCell>
              <TableCell>{task.dueDate}</TableCell>
              <TableCell align="right">
                <IconButton color="primary" onClick={() => onEdit(task)}>
                  <EditIcon />
                </IconButton>
                <IconButton color="error" onClick={() => handleDelete(task.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TaskList;
