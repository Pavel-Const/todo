import styles from "./addTask.module.scss";
import {useDispatch} from "react-redux";
import React, {useState} from "react";
import {addTask} from "../../store/slices/taskSlice.ts";

export default function AddTask() {
    const [task, setTask] = useState("");
    const dispatch = useDispatch();
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (task.trim()) {
              dispatch(addTask(task));
              setTask('');
        }
    };
    return (
        <form className={styles.add} onSubmit={handleSubmit}>
            <div className={styles.add__field}>
                <input type="text"
                       className={styles.add__input}
                       value={task}
                       onChange={(e) => setTask(e.target.value)}
                       placeholder="Добавить новую задачу..."
                />
            </div>
            <button className={styles.add__button} type="submit">ADD</button>
        </form>
    );
};
