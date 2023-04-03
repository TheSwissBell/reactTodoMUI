import React, { useState, useRef } from 'react';
// import { useState, useEffect } from 'react';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs from 'dayjs';

import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';


export default function Todolist() {
    // OR if you import useState from react
    // const [description, setDescription] = useState('');


    const [todo, setTodo] = React.useState({
        description: '',
        priority: '',
        date: ''
    })

    const [todos, setTodos] = React.useState([]);



    // Grid
    const [columnDefs] = useState([  // We don't to update it so no need for setColumnDefs
        { field: 'description', sortable: true, filter: true, floatingFilter: true },
        {
            field: 'priority', sortable: true,
            cellStyle: params => params.value === "High" ? { color: 'red' } : { color: 'black' }
        },
        { field: 'date', sortable: true }

    ])


    const gridRef = useRef(); // It creates some reference object and save it to the variable gridRef

    const handleAddTodo = (event) => {
        event.preventDefault();
        setTodos([todo, ...todos]);
        setTodo({ description: '', date: '' });
    };

    const handleDeleteTodo = (event) => {
        event.preventDefault();
        if (gridRef.current.getSelectedNodes().length > 0) {
            setTodos(todos.filter((todo, index) => index != gridRef.current.getSelectedNodes()[0].id))
        }
        else {
            alert('Please, select a row you want to delete');
        }
    };

    const handleDateChange = (date) => {
        setTodo({ ...todo, date: dayjs(date).startOf('day').toDate() });
    };

    function TabPanel(props) {
        const { children, value, index, ...other } = props;

        return (
            <div
                role="tabpanel"
                hidden={value !== index}
                id={`simple-tabpanel-${index}`}
                aria-labelledby={`simple-tab-${index}`}
                {...other}
            >
                {value === index && (
                    <Box sx={{ p: 3 }}>
                        <Typography>{children}</Typography>
                    </Box>
                )}
            </div>
        );
    }

    TabPanel.propTypes = {
        children: PropTypes.node,
        index: PropTypes.number.isRequired,
        value: PropTypes.number.isRequired,
    };

    function a11yProps(index) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="HOME" {...a11yProps(0)} />
                        <Tab label="TODOS" {...a11yProps(1)} />
                    </Tabs>
                </Box>
                <TabPanel value={value} index={0}>
                    <h1>Welcome to MY TODO MUI</h1>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    <form title="Add todo">
                        <Stack direction='row'
                            spacing={2}
                            alignItems='center'
                            justifyContent='center'
                        >
                            <TextField
                                label='Description'
                                variant='standard'
                                value={todo.description}
                                onChange={e => setTodo({ ...todo, description: e.target.value })}
                            />

                            <TextField
                                label='Important'
                                variant='standard'
                                value={todo.priority}
                                onChange={e => setTodo({ ...todo, priority: e.target.value })}
                            />

                            <TextField
                                label='Date'
                                value={todo.date}
                                variant='standard'
                                onChange={e => setTodo({ ...todo, date: e.target.value })}
                            />
                            <LocalizationProvider
                                dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    onChange={handleDateChange}
                                />
                            </LocalizationProvider>
                            <Button onClick={handleAddTodo}
                                variant="contained"

                            >Add
                            </Button>
                            <Button onClick={handleDeleteTodo}
                                variant='outlined'
                                color="error"
                            >Delete selected</Button>
                        </Stack>
                    </form>

                    <div className="ag-theme-material" style={{ height: 400, width: 600, margin: 'auto' }}>
                        <AgGridReact
                            ref={gridRef}
                            onGridReady={params => gridRef.current = params.api}
                            rowSelection="single"
                            rowData={todos}
                            columnDefs={columnDefs}
                            animateRows={true}
                        >
                        </AgGridReact>
                    </div>

                </TabPanel>
            </Box>



        </div >
    )
}

// OR
//export default Todolist;