### Task Manager App Spec  
  
**Current Setup:**  
- The project is initialized with Vite using the React template and TypeScript.  
- Material UI and Material Icons packages are installed.  
  
**Goal:**  
Create a task manager app with a dark palette feel. Implement the following components,   
applying the CssBaseline reset component for consistent styling.

**List of installed packages:**
- react
- react-dom
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/lab
- @mui/material
- @mui/x-date-pickers
- dayjs
- idb
- uuid

> uuid must be use to generate a valid UUID when saving a task. Do not add or remove any packages.

> A datePicker component must be used to edit date values, example code:

```
// use packages from @mui/x-date-pickers

import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers';

// ...

<Box sx={{ mt: 2 }}>
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
        label="Due Date"
        value={dueDate}
        onChange={(newValue) => setDueDate(newValue || new Date().toISOString().split('T')[0])}
        />
    </LocalizationProvider>
</Box>
```

1) **TaskItem Type**  
 - Consists of:  
 - An UUID (empty string by default)
 - A description  
 - A dueDate (in YYYY-MM-DD format)  
 - A boolean `isDone` attribute (false by default)

2) **ApplicationBar**  
 - Implements an `AppBar` component.  
 - Contains:  
 - A brand named "Task Manager"  
 - A button with a '+' sign to add a task using the TaskItemEditor modal
 - A switch component to toggle visibility of tasks based on the `isDone` attribute  
   * By default this filter is off (False) so that only tasks that are not done are displayed
  
3) **TaskItemEditor Modal**  
 - For creating or editing a task.  
 - Includes all TaskItem fields except the `isDone` attribute, which is editable only in the TaskList component.  
  
4) **TaskList Component**  
 - Displays tasks in a table layout using Material UI components with four columns:  
 - "Is done": Contains a switch to toggle the `isDone` attribute.  
 - "Description"  
 - "dueDate"  
 - "Actions": Includes buttons for deleting and editing tasks (the delete action requires user confirmation).  

 5) **Data layer typescript classes for saving tasks**
 - Follow decoupled interface type implementation pattern to allow the default connection (IndexedDB) 
   to be replace by another one (example: Remote MySQL connection) in a future implementation
 - Use indexedDB builtin browser implementation by default with idb (installed dependencie)
 - Allow simple CRUD operation

 6) **Confirm dialog component**
 - Used to prompt the user with a confirmation message
 - Cancel button will cancel the action
 - Confirm button will execute the action

 > Do not use raw window.prompt calls

**Main Component:**  
- The main component (`App.tsx`) located at `src/App.tsx`.  
- Handles all interactions with sub-components.  
- TaskItems are persisted using the data layer typescript classes.

**Design guide lines:**
1) When importing an interface use the **type** qualifier, for example:

```
import { openDB, type DBSchema, type IDBPDatabase } from 'idb';
// or
import type { TaskItem } from '../types/task-item';
```

2) Every component should have their own file
3) Every interfaces should have their own file
4) Global styling (use of CssBaseLine, dark Palette) should be putted in main.tsx file
5) Do not use vanilla css inline style unless necessary but use builtin Material UI & Material icons elements
6) use **slotProps** instead of **renderInput** where possible
7) **Do not use Omit**. When a TaskItem is being created the **id** initial value is an empty string and will only get an UUID value upon saving
