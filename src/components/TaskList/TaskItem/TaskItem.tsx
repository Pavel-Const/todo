import styles from "./taskItem.module.scss";
import cn from "classnames";
import {deleteTask, editTask, Task, toggleTask} from "../../../store/slices/taskSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store.ts";
import {useState} from "react";


interface TaskItemProps {
    task: Task;
}

export const TaskItem: React.FC<TaskItemProps> = ({task}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [text, setText] = useState(task.text);
    
    const handleSave = (id: number, text: string) => {
        dispatch(editTask({id, text}));
        setIsEdit(false);
    };
    return (
        <li className={cn(styles.item, task.completed && styles.item_complited, isEdit && styles.item_edit)}>
            <input
                type="checkbox"
                checked={task.completed}
                className={styles.checkbox}
                onChange={() => dispatch(toggleTask(task.id))}
            />
            <input className={styles.text} readOnly={!isEdit} value={text} onChange={(e) => setText(e.target.value)}/>
            {!isEdit ?
                <button className={styles.editBtn} onClick={() => setIsEdit(true)}>Редактировать</button>
                : <button className={styles.editBtn}
                          onClick={() => handleSave(task.id, task.text)}>Сохранить</button>}
            
            <button className={styles.deleteBtn} onClick={() => dispatch(deleteTask(task.id))}>Удалить
            </button>
        </li>
    );
};
