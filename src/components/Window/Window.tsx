import styles from "./window.module.scss";
import cn from "classnames";
import Content from "../Content/Content.tsx";

export default function Window() {
    return (
        <section className={styles.window}>
            <div className={styles.window__head}>
                <div className={styles.window__icons}>
                    <span className={cn(styles.window__circle, styles.window__circle_red)}></span>
                    <span className={cn(styles.window__circle, styles.window__circle_yellow)}></span>
                    <span className={cn(styles.window__circle, styles.window__circle_blue)}></span>
                </div>
                <div className={styles.window__title}>
                    Todo
                </div>
            </div>
            <Content/>
        </section>
    );
};
