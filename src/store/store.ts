import {configureStore} from "@reduxjs/toolkit";
import tasksReducer, {setTasks} from "./slices/taskSlice.ts";

export const store = configureStore({
    reducer: {
        tasks: tasksReducer,
    },
});

store.subscribe(() => {
    const state = store.getState();
    localStorage.setItem("tasks", JSON.stringify(state.tasks.tasks));
});

const savedTasks = localStorage.getItem("tasks");
if (savedTasks) {
    const tasks = JSON.parse(savedTasks);
    store.dispatch(setTasks(tasks));
}
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
