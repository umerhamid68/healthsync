import HabitItem from "./HabitItem";
import styles from "./HabitList.module.css";

export default function HabitList({ habits }) {
  return (
    <ul className={styles.list}>
      {habits.length > 0 ?
      (habits.map((habit) => (
        <HabitItem
          id={habit.id}
          name={habit.name}
          frequency={habit.frequency}
          streakCount={habit.streakCount}
          category={habit.category}
        />
      ))
      ): (
        <p>No Habits available.</p>
      )}
    </ul>
  );
}
