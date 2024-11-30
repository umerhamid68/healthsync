import HabitList from "../habits/HabitList";
import styles from "./Dashboard.module.css";

export default function Dashboard({ habits }) {
  return (
    <div className={styles.dashboard}>
      <h1>Habit Dashboard</h1>
      <HabitList habits={habits} />
    </div>
  );
}
