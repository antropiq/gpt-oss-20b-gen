### Task Manager App Spec  
  
**Current Setup:**  
- The project is initialized with Vite using the React template and TypeScript.  
- Material UI and Material Icons packages are installed.  
  
**Goal:**  
Create a task manager app with a dark palette feel. Implement the following components,   
applying the CssBaseline reset component for consistent styling.

**List of installed packages:**
- @emotion/react
- @emotion/styled
- @mui/icons-material
- @mui/material
- react
- react-dom
- uuid
- date-fns
- date-fns-tz
- @mui/lab

> uuid must be use to generate a valid UUID when saving a task. Do not add or remove any packages.

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
  
  
3) **TaskItemEditor Modal**  
 - For creating or editing a task.  
 - Includes all TaskItem fields except the `isDone` attribute, which is editable only in the TaskList component.  
  
4) **TaskList Component**  
 - Displays tasks in a table layout using Material UI components with four columns:  
 - "Is done": Contains a switch to toggle the `isDone` attribute.  
 - "Description"  
 - "dueDate"  
 - "Actions": Includes buttons for deleting and editing tasks (the delete action requires user confirmation).  
  
**Main Component:**  
- The main component (`App.tsx`) located at `src/App.tsx`.  
- Handles all interactions with sub-components.  
- TaskItems do not need to be persisted.

**Design guide lines:**
- When importing an interface use the **type** keyword like so: ```imort type { typeName } from typeFile```
- Every component should have their own file
- Every interfaces should have their own file
- Global styling (use of CssBaseLine, dark Palette) should be putted in main.tsx file
- Do not use vanilla css inline style unless necessary but use builtin Material UI & Material icons elements

