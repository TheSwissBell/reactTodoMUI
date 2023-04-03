import './App.css';
import Todolist from './components/todolist';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography'

function App() {
  return (
    
    <div className="App">
      <AppBar position="static">
                <Toolbar variant="dense">
                    <Typography variant="h6" color="inherit" component="div">
                        MY TODO MUI
                    </Typography>
                </Toolbar>
            </AppBar>
      <Todolist />
    </div>
  );
}

export default App;