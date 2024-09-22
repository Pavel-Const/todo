import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import styles from "./taskList.module.scss";
import {TaskItem} from "./TaskItem/TaskItem.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useCallback, useEffect, useState} from "react";
import {setTasks} from "../../store/slices/taskSlice.ts";

export default function TaskList() {
    const {tasks, filter} = useSelector((state: RootState) => state.tasks);
    const [taskOrder, setTaskOrder] = useState(tasks);
    const dispatch = useDispatch();
    useEffect(() => {
        if (filter === "completed") {
            setTaskOrder(tasks.filter(item => item.completed));
        } else if (filter === "pending") {
            setTaskOrder(tasks.filter(item => !item.completed));
        } else {
            setTaskOrder([...tasks]);
        }
    }, [filter, tasks]);
    
    const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
        if (filter === "all") {
            const dragTask = taskOrder[dragIndex];
            const updatedTasks = [...taskOrder];
            updatedTasks.splice(dragIndex, 1);
            updatedTasks.splice(hoverIndex, 0, dragTask);
            setTaskOrder(updatedTasks);
            dispatch(setTasks(updatedTasks))
        }
    }, [taskOrder, filter]);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <ul className={styles.list}>
                {taskOrder.map((task, index) => (
                    <TaskItem task={task} key={task.id} moveTask={moveTask} index={index}/>
                ))}
            </ul>
        </DndProvider>
    );
};
