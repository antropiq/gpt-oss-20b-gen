// src/components/ApplicationBar.tsx
import { AppBar, Toolbar, Typography, IconButton, Switch, Box } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

interface ApplicationBarProps {
  onAdd: () => void;
  filterDone: boolean;
  onFilterChange: (checked: boolean) => void;
}

const ApplicationBar: React.FC<ApplicationBarProps> = ({ onAdd, filterDone, onFilterChange }) => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Task Manager
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Switch
          checked={filterDone}
          onChange={(e) => onFilterChange(e.target.checked)}
          color="default"
          inputProps={{ 'aria-label': 'Show completed tasks' }}
        />
        <IconButton color="inherit" onClick={onAdd} aria-label="add task">
          <AddIcon />
        </IconButton>
      </Box>
    </Toolbar>
  </AppBar>
);

export default ApplicationBar;
