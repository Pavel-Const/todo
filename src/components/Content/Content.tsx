import styles from "./content.module.scss";
import Header from "../Header/Header.tsx";
import AddTask from "../AddTask/AddTask.tsx";
import TaskList from "../TaskList/TaskList.tsx";
import TaskFilter from "../TaskFilter/TaskFilter.tsx";

export default function Content() {
    return (
        <section className={styles.content}>
            <Header/>
            <AddTask/>
            <TaskFilter/>
            <TaskList/>
        </section>
    );
};
