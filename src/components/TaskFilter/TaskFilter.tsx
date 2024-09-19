import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../../store/store.ts";
import {setFilter} from "../../store/slices/taskSlice.ts";
import styles from "./taskFilter.module.scss";
import cn from "classnames";

const TaskFilter: React.FC = () => {
    const dispatch = useDispatch<AppDispatch>();
    const filter = useSelector((state: RootState) => state.tasks.filter);
    
    return (
        <div className={styles.filter}>
            <button className={cn(styles.filter__btn, filter === "all" && styles.filter__btn_active)}
                    onClick={() => dispatch(setFilter("all"))}>
                Все
            </button>
            <button className={cn(styles.filter__btn, filter === "completed" && styles.filter__btn_active)}
                    onClick={() => dispatch(setFilter("completed"))}>
                Выполненные
            </button>
            <button className={cn(styles.filter__btn, filter === "pending" && styles.filter__btn_active)}
                    onClick={() => dispatch(setFilter("pending"))}>
                Невыполненные
            </button>
        </div>
    );
};

export default TaskFilter;
