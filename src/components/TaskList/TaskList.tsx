import {useSelector} from "react-redux";
import {RootState} from "../../store/store.ts";
import styles from "./taskList.module.scss";
import {TaskItem} from "./TaskItem/TaskItem.tsx";

export default function TaskList() {
    const {tasks, filter} = useSelector((state: RootState) => state.tasks);
    const filteredTasks = tasks.filter((task) => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });
    return (
        <ul className={styles.list}>
            {filteredTasks.map((task) => (
                <TaskItem task={task} key={task.id} />
            ))}
        </ul>
    );
};
