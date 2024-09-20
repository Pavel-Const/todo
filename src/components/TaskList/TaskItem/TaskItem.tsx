import styles from "./taskItem.module.scss";
import cn from "classnames";
import {deleteTask, editTask, Task, toggleTask} from "../../../store/slices/taskSlice.ts";
import {useDispatch} from "react-redux";
import {AppDispatch} from "../../../store/store.ts";
import {useRef, useState} from "react";
import {useDrag, useDrop} from "react-dnd";

interface TaskItemProps {
    task: Task;
    index: number;
    moveTask: (dragIndex: number, hoverIndex: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({task, index, moveTask}) => {
    const dispatch = useDispatch<AppDispatch>();
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [text, setText] = useState(task.text);
    const ref = useRef<HTMLLIElement>(null);
    
    const [{isDragging}, drag] = useDrag({
        type: "task",
        item: {index},
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    });
    
    const [, drop] = useDrop({
        accept: "task",
        hover: (item: { index: number }) => {
            if (item.index !== index) {
                moveTask(item.index, index);
                item.index = index;
            }
        },
    });
    
    drag(drop(ref));
    const handleSave = (id: number, text: string) => {
        dispatch(editTask({id, text}));
        setIsEdit(false);
    };
    return (
        <li ref={ref}
            className={cn(styles.item,
                task.completed && styles.item_complited,
                isEdit && styles.item_edit,
                isDragging && styles.item_dragging)}>
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
                          onClick={() => handleSave(task.id, text)}>Сохранить</button>}
            
            <button className={styles.deleteBtn} onClick={() => dispatch(deleteTask(task.id))}>Удалить
            </button>
        </li>
    );
};
