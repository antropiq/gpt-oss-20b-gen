import { AppBar, Toolbar, Typography, IconButton, Switch, FormControlLabel } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import type { FC } from 'react';

type ApplicationBarProps = {
  onAddTask: () => void;
  showDoneFilter: boolean;
  setShowDoneFilter: (value: boolean) => void;
};

const ApplicationBar: FC<ApplicationBarProps> = ({ onAddTask, showDoneFilter, setShowDoneFilter }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Task Manager
        </Typography>
        <FormControlLabel
          control={
            <Switch
              checked={showDoneFilter}
              onChange={(e) => setShowDoneFilter(e.target.checked)}
              color="default"
            />
          }
          label="Show Done"
        />
        <IconButton color="inherit" onClick={onAddTask}>
          <AddIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default ApplicationBar;
