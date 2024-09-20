import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import styles from "./taskList.module.scss";
import {TaskItem} from "./TaskItem/TaskItem.tsx";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import {useCallback, useEffect, useState} from "react";

export default function TaskList() {
    const {tasks, filter} = useSelector((state: RootState) => state.tasks);
    const [taskOrder, setTaskOrder] = useState(tasks);
    
    useEffect(() => {
        setTaskOrder(tasks)
    }, [tasks]);
    
    
    const filteredTasks = taskOrder.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });
    const moveTask = useCallback((dragIndex: number, hoverIndex: number) => {
        const updatedTasks = [...taskOrder];
        const [movedTask] = updatedTasks.splice(dragIndex, 1);
        updatedTasks.splice(hoverIndex, 0, movedTask);
        setTaskOrder(updatedTasks);
    }, [taskOrder]);
    
    return (
        <DndProvider backend={HTML5Backend}>
            <ul className={styles.list}>
                {filteredTasks.map((task, index) => (
                    <TaskItem task={task} key={task.id} moveTask={moveTask} index={index}/>
                ))}
            </ul>
        </DndProvider>
    );
};
