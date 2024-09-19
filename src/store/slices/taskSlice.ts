import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Task {
    id: number;
    text: string;
    completed: boolean;
}

interface TasksState {
    tasks: Task[];
    filter: 'all' | 'completed' | 'pending';
}

const initialState: TasksState = {
    tasks: [],
    filter: 'all',
};

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.tasks.push({
                id: Date.now(),
                text: action.payload,
                completed: false,
            });
        },
        toggleTask: (state, action: PayloadAction<number>) => {
            const task = state.tasks.find((task) => task.id === action.payload);
            if (task) task.completed = !task.completed;
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter((task) => task.id !== action.payload);
        },
        editTask: (state, action: PayloadAction<{ id: number; text: string }>) => {
            const task = state.tasks.find((task) => task.id === action.payload.id);
            if (task) task.text = action.payload.text;
        },
        setFilter: (state, action: PayloadAction<'all' | 'completed' | 'pending'>) => {
            state.filter = action.payload;
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        },
    },
});

export const { addTask, toggleTask, deleteTask, editTask, setFilter, setTasks } = tasksSlice.actions;

export default tasksSlice.reducer;
