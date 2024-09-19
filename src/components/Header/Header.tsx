import styles from "./Header.module.scss";

export default function Header() {
    return (
        <header className={styles.header}>
            <div className={styles.header__logo}>
                <img src="/images/logo.jpg" alt=""/>
            </div>
            <div className={styles.header__titleBlock}>
                <h1 className={styles.header__title}>ToDo List</h1>
                <span className={styles.header__subtitle}>Добавь задачку</span>
            </div>
        </header>
    );
};
